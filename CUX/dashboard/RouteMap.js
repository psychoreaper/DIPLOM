Ext.define('CUX.dashboard.RouteMap', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.container.Container',
    requires: [],
    alias: 'widget.routemap',

    html: '<div id="yandex-map" style="height: 400px;"></div>\n',
    title: 'Маршрут',

    metaValues: null,
    studentsData: null,

    initComponent: function () {
        this.callParent(arguments);
        // this.loadStores();
        // this.setDefaults();

        //this.metaValues = Ext.create('Ext.util.HashMap');

        // ТУТ ЗАПРОС К БЭКУ

        //this.loadMetaData('meta/entities?size=5');
        var schoolData = this.loadSchoolData('search?_dc=' + Number(new Date()), {
            "asOf": "2021-04-10T00:00:00.000",
            "count": 30,
            "countOnly": false,
            "entity": "School",
            "fetchAll": true,
            "page": 1,
            "start": 0,
            "searchFields": ["Name"],
            "returnFields": ["Name", "Address_Text", "Address_Coord", "$from", "$to"],
        });
        console.log(schoolData[0][1].value);
        var referencePoints = [];
        referencePoints.push(schoolData[0][1].value);

        this.studentsData = this.loadStudentsData('search?_dc=' + Number(new Date()), {
            "asOf": "2021-04-10T00:00:00.000",
            "count": 30,
            "countOnly": false,
            "entity": "Student",
            "fetchAll": true,
            "page": 1,
            "start": 0,
            "searchFields": ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
            "returnFields": ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
        });

        this.studentsData.forEach(i => referencePoints.push(i[4].value));
        // referencePoints.push(this.studentsData.map(x => {
        //     return x[4].value //не нравится мне это...
        // }));

        /*var referencePoints = [
            'Санкт-Петербург, Средний проспект Васильевского острова, 20',
            'Санкт-Петербург, 7-я линия Васильевского острова, 72',
            'Санкт-Петербург, 3-я линия Васильевского острова, 46',
            'Санкт-Петербург, 13-я линия Васильевского острова, 56',
        ];*/

        console.log(referencePoints);

        // отрисовываем карту с маршрутом
        //this.drawMap(referencePoints);
        this.drawMap(this.runTSP(referencePoints));

    },

    // отрисовка карты
    drawMap: function (points) {
        var me = this,
            n = points.length,
            //sortedPoints = [],
            sortedPoints = points;
            routePromises = [];
        ymaps.ready(mapInit);

        function mapInit() {

            /*// создание матрицы
            debugger;
            var matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i === j) matrix[i][j] = Number.POSITIVE_INFINITY
                    else {
                        routePromises.push(new ymaps.route([points[i], points[j]], {
                            multiRoute: false
                        }).then(function (route) {
                            console.log(route);
                            //route.options.set("mapStateAutoApply", true);

                            //console.log(route.getHumanLength(), route.getHumanTime(), route.getJamsTime(), route.getLength(), route.getTime());
                            //1.7&#160;км 3&#160;мин 502.8161778450012 1663.4763312339783 209.3511523604393
                        }/!*, function (err) {
                            throw err;
                        }, this*!/));
                    }
                }
            }
            Promise.all(routePromises).then(
                (x) => console.log(x)
                //matrix[i][j] = route.getJamsTime() / 60;
            );

            //debugger;
            sortedPoints = me.runTSP(matrix, points);*/

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
    //runTSP: function (matrix, points) {
    runTSP: function (points) {
        var me = this,
            resultPoints = [];

        resultPoints = me.solveTSP(points);
        console.log(resultPoints);
        return resultPoints;
    },

    // получение матрицы критериев для задачи коммивояжёра. пока что используем расстояние между пунктами
    getMatrix: function (points) {
        var matrix = [
            [Number.POSITIVE_INFINITY, 0.78, 0.99, 1.1],
            [0.78, Number.POSITIVE_INFINITY, 1.1, 0.7],
            [0.99, 1.1, Number.POSITIVE_INFINITY, 1.4],
            [1.1, 0.7, 1.4, Number.POSITIVE_INFINITY]
        ];

        // TODO: написать получение матрицы
        // ТУТ ЗАПРОС НА ЯНДЕКСОВОЕ АПИ
        // var route = ymaps.route([points[0], points[1]]).then(function (route) {
        //     console.log(route);
        // });
        //console.log(route.getHumanLength(), route.getHumanTime(), route.getJamsTime(), route.getLength(), route.getTime());

        return matrix;
    },

    // решение задачи коммивояжёра
    //solveTSP: function (matrix, coordPoints) {
    solveTSP: function (coordPoints) {
        var me = this,
            dist = me.getMatrix(coordPoints),
            points = [],
            n = coordPoints.length,
            d = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)),
            p = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY));

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

// d - расстояние
// p - маршрут
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

    createUrl: function (isExport) {
        var entities = this.lookupReference('entities');
        var url;

        if (isExport) {
            url = Unidata.Config.getMainUrl() + "custom/rest/getPotencialDuplicatesToExcel";
        } else {
            url = Unidata.Config.getMainUrl() + "custom/rest/getPotencialDuplicates";
            if (entities.getValueRecords() && entities.getValueRecords().length > 0) {
                url += "?";
                entities.getValueRecords().forEach(element => {
                    url += "entities=" + element.data.name + "&";
                });
                url = url.slice(0, -1);
            }
        }
        return url;
    },

    sendRequest: function (url, callback) {
        var me = this;
        return Ext.Ajax.request({
            url: url,
            method: 'GET',
            scope: this,
            timeout: 60000,
            success: function (response) {
                var result = JSON.parse(response.responseText).content;
                var resultArray = [];

                result.forEach(element => {
                    var entity = element.entityName;
                    Object.keys(element.ruleToCount).forEach(function (key) {
                        var value = element.ruleToCount[key];
                        // resultArray.push(Ext.create('CUX.dashboard.potentialduplicates.DuplicateModel', {
                        //     entityName: me.view.displayValues.map[entity],
                        //     ruleName: key,
                        //     count: value
                        // }))
                        debugger;
                    });
                });

                // var grid = this.lookupReference("customgrid");
                // grid.getStore().loadData(resultArray);
                // grid.getView().refresh();
            },
            failure: function (response) {
                alert('Ошибка подключения');
            }
        });
    },

    // TODO: добавить элементов
    // items: [
    //     {
    //         xtype: 'container',
    // layout: {
    //     type: 'hbox'
    // },
    // defaults: {
    //     margin: '0 0 15 0'
    // },
    // items: {
    //     xtype: 'container',
    //     width: 600,
    //     height: 380,
    //     html: '<div id="yandex-map"></div>',
    // }
    //     }
    // ]
});
