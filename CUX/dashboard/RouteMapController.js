Ext.define('CUX.dashboard.RouteMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.routemap',

    requires: [
        "CUX.DataObtainer",
    ],

    init: function () {
        this.callParent(arguments);

        this.loadSchoolsStore();
        this.loadClassesStore();
    },

    filterSchoolContent: function () {
        var className = this.lookupReference('classes').getValue(),
            store = this.getViewModel().getStore('classesStore');
        if (!this.lookupReference('schools').getValue()) {
            var school;
            store.data.items.forEach(i => {
                if (i.data.Name === className) school = i.data.School_Text
            });
            this.lookupReference('schools').setValue(school);
        }
    },

    filterClassContent: function () {
        var school = this.lookupReference('schools').getValue(),
        store = this.getViewModel().getStore('classesStore');

        if (school) store.filter('School_Text', school);
        else store.clearFilter(true);
        store.load();
    },

    onSchoolsExpand: function () {
        var store = this.getViewModel().getStore('schoolsStore');
        store.load();
    },

    onBuildButtonClick: function () {
        this.loadData();
        this.getYandexMatrix();
    },

    onBuildMatrixButtonClick: function () {
        this.loadMatrixData();
    },

    loadData: function () {
        var school = this.lookupReference('schools').getValue();
        var className = this.lookupReference('classes').getValue();
        if (school === null || className === null) {
            Unidata.util.UserDialog.showWarning('Не указаны класс и/или школа');
        } else {
            this.referencePoints = CUX.DataObtainer.obtainAddresses(school, className);
        }
    },

    loadMatrixData: function () {
        var school = this.lookupReference('schools').getValue();
        var className = this.lookupReference('classes').getValue();
        if (school === null || className === null) {
            Unidata.util.UserDialog.showWarning('Не указаны класс и/или школа');
        } else {
            this.referencePoints = CUX.DataObtainer.obtainAddresses(school, className);
            this.drawMap(this.runTSP(this.referencePoints, CUX.DataObtainer.obtainMatrix(school, className)));
            var res = '';
            Ext.each(this.sortedPoints, function (i) {
                res += '&#8226; ' + i + '<br>';
            })
            Ext.ComponentQuery.query('[itemId=routeText]')[0].getEl().setHtml(res);
        }
    },

    getYandexMatrix: function () {
        var me = this,
            route = [],
            n = me.referencePoints.length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                route.push(new ymaps.route([me.referencePoints[i], me.referencePoints[j]]));
            }
        }

        Promise.all(route).then(function (geoCodeValues) {
            me.drawMap(me.runTSP(me.referencePoints, me.parseMatrix(geoCodeValues)));
            var res = '';
            Ext.each(me.sortedPoints, function (i) {
                res += '&#8226; ' + i + '<br>';
            })
            Ext.ComponentQuery.query('[itemId=routeText]')[0].getEl().setHtml(res);
        });
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

        this.sortedPoints = points;

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

    // решение задачи коммивояжёра
    runTSP: function (points, matrix) {
        var resultPoints = [];

        resultPoints = this.solveTSP(points, matrix);
        return resultPoints;
    },

    // поиск решения
    solveTSP: function (coordPoints, matrix) {
        var me = this,
            //dist = me.getMatrix(coordPoints),
            dist = matrix,
            points = [],
            n = coordPoints.length,
            d = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)), // расстояние
            p = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)); // маршрут

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

        var res = [];
        for (let i = 0; i < n; i++) {
            res.push(coordPoints[path[i]]);
        }
        res.push(res[0]);

        return res;

        // bitmask | (1 << next) ставит единичку на nextовый бит
        // то есть допустим bitmask = 00010, next = 2. тогда мы ставим единичку на 2 позицию
    },

    loadSchoolsStore: function () {
        var schools = this.getViewModel().getStore('schoolsStore');
        schools.load();
    },

    loadClassesStore: function () {
        var classes = this.getViewModel().getStore('classesStore');
        classes.load();
    },

});
