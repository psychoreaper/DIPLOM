Ext.define('CUX.dashboard.RouteMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.routemap',

    init: function () {
        this.callParent(arguments);
        var referencePoints = [],
            schoolData,
            studentsData;

        schoolData = this.loadSchoolData('search?_dc=' + Number(new Date()), {
            "asOf": "2021-04-29T00:00:00.000",
            "count": 30,
            "countOnly": false,
            "entity": "School",
            "fetchAll": true,
            "page": 1,
            "start": 0,
            "searchFields": ["Name"],
            "returnFields": ["Name", "Address_Text", "Address_Coord", "$from", "$to"],
        });
        referencePoints.push(schoolData[0][1].value);

        studentsData = this.loadStudentsData('search?_dc=' + Number(new Date()), {
            "asOf": "2021-04-29T00:00:00.000",
            "count": 30,
            "countOnly": false,
            "entity": "Student",
            "fetchAll": true,
            "page": 1,
            "start": 0,
            "searchFields": ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
            "returnFields": ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
        });

        studentsData.forEach(i => referencePoints.push(i[4].value));

        //TODO: разобраться с этим говном
        // var storeSchoolItems = this.getViewModel()/*.getStore('schoolsStore')*/;
        // console.log(storeSchoolItems);
        this.referencePoints = referencePoints;
    },

    onBuildButtonClick: function () {
        // отрисовываем карту с маршрутом
        //this.drawMap(this.runTSP(this.referencePoints));
        debugger;
        this.getYandexMatrix();
    },

    onMatrixButtonClick: function () {
        this.getYandexMatrix();
    },

    getYandexMatrix: function () {
        var me = this,
            route = [],
            n = me.referencePoints.length,
            result = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                route.push(new ymaps.route([me.referencePoints[i], me.referencePoints[j]]));
            }
        }

        Promise.all(route).then(function (geoCodeValues) {
            me.drawMap(me.runTSP(me.referencePoints, me.parseMatrix(geoCodeValues)));
        });

        //debugger;
    },

    parseMatrix: function (geoCodeValues) {
        var values = [],
            matrix = [],
            n = this.referencePoints.length;

        for (let i = 0; i < n; i++) {
            values.push(geoCodeValues.splice(0, n - 1));
            values[i] = values[i].reverse();
        }

        for (let i = 0; i < n; i++) {
            matrix.push([]);
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    matrix[i].push(Number.POSITIVE_INFINITY);
                    continue;
                }
                matrix[i].push(values[i].pop().getLength());
            }
        }
        return matrix;
    },

    // отрисовка карты
    drawMap: function (points) {
        var me = this.getView(),
            n = points.length,
            sortedPoints = points;

        ymaps.ready(mapInit);

        function mapInit() {
            var myMap = new ymaps.Map("yandex-map", {
                center: [59.939095, 30.315868],
                zoom: 9
            });
            if (sortedPoints !== []) {
                var multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: sortedPoints
                }, {
                    boundsAutoApply: true
                });
                myMap.geoObjects.add(multiRoute);
            }
        }
    },

    // поиск решения
    runTSP: function (points, matrix) {
        var resultPoints = [];

        resultPoints = this.solveTSP(points, matrix);
        return resultPoints;
    },

    // получение матрицы критериев для задачи коммивояжёра. пока что используем расстояние между пунктами
    /*getMatrix: function (points) {
        var matrix = [
            [Number.POSITIVE_INFINITY, 0.78, 0.99, 1.1],
            [0.78, Number.POSITIVE_INFINITY, 1.1, 0.7],
            [0.99, 1.1, Number.POSITIVE_INFINITY, 1.4],
            [1.1, 0.7, 1.4, Number.POSITIVE_INFINITY]
        ];

        // TODO: написать получение матрицы

        return matrix;
    },*/

    // решение задачи коммивояжёра
    solveTSP: function (coordPoints, matrix) {
        var me = this,
            //dist = me.getMatrix(coordPoints),
            dist = matrix,
            points = [],
            n = coordPoints.length,
            d = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)), // расстояние
            p = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)); // маршрут

        debugger;
        for (var i = 0; i < n; i++) {
            points.push({id: i, coord: coordPoints[i]});
        }

        for (let i = 0; i < n; i++) {
            d[1 << i][i] = dist[0][i]
            p[1 << i][i] = 0
        }

        for (let bitmask = 1; bitmask < (1 << n); bitmask++) {
            for (var last = 0; last < n; last++) {
                if (d[bitmask][last] === Number.POSITIVE_INFINITY) { // если мы ещё ни разу не посетили такой набор учеников, закончив на ученике last
                    continue;
                }
                for (let next = 0; next < n; next++) {
                    if ((bitmask & (1 << next)) === 0 && // если мы ещё не забрали текущего ученика
                        d[bitmask | (1 << next)][next] > d[bitmask][last] + dist[last][next]
                    ) { // и мы нашли более короткий путь
                        d[bitmask | (1 << next)][next] = d[bitmask][last] + dist[last][next] // обновляем минимальное расстояние
                        p[bitmask | (1 << next)][next] = last
                        // массив p нужен чтоб восстановить кратчайший путь, мы записываем сюда вершину, из которой мы попали в данное состояние
                    }
                }
            }
        }

        var path = []
        var bitmask = (1 << n) - 1 // все единички типа
        var current = 0
        var tmp
        while (bitmask !== 0) {
            path.push(current) // добавляем текущую вершину в путь
            tmp = current
            current = p[bitmask][current] // переходим к предыдущей вершине
            bitmask ^= (1 << tmp) // удаляем вершину из маски
        }

        //debugger;
        console.log(path);
        var res = [];
        for (let i = 0; i < n; i++) {
            res.push(coordPoints[path[i]]);
        }
        res.push(res[0]);

        return res;

        // bitmask | (1 << next) ставит единичку на nextовый бит
        // то есть допустим bitmask = 00010, next = 2. тогда мы ставим единичку на 2 позицию
    },

    loadMetaData: function (endpoint) {
        var me = this;
        Ext.Ajax.request({
            url: Unidata.Config.getMainUrl() + 'internal/' + endpoint,
            async: false,
            method: 'GET',
            scope: 'this',
            success: function (response) {
                var hits = JSON.parse(response.responseText).content;
                hits.forEach(hit => {
                    me.metaValues.add(hit.name, hit.displayName);
                });
                console.log(me.metaValues);
            }
        });
    },

    loadStudentsData: function (endpoint, config) {
        var me = this,
            hits = [];
        Ext.Ajax.request({
            url: Unidata.Config.getMainUrl() + 'internal/search'/* + endpoint*/,
            async: false,
            method: 'POST',
            jsonData: config,
            success: function (response) {
                hits = JSON.parse(response.responseText).hits.map(x => {
                    return x.preview
                });
            }
        });
        return hits;
    },

    loadSchoolData: function (endpoint, config) {
        var me = this,
            hits = [];
        Ext.Ajax.request({
            url: Unidata.Config.getMainUrl() + 'internal/search'/* + endpoint*/,
            async: false,
            method: 'POST',
            jsonData: config,
            success: function (response) {
                hits = JSON.parse(response.responseText).hits.map(x => {
                    return x.preview
                });
            }
        });
        return hits;
    },
});
