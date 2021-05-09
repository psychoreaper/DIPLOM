Ext.define('CUX.dashboard.RouteMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.routemap',

    requires: [
        "CUX.DataObtainer",
        "CUX.dashboard.TSP"
    ],

    initComponent: function () {
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

    onListButtonClick: function () {
        var school = this.lookupReference('schools').getValue();
        var className = this.lookupReference('classes').getValue();
        if (school === null || className === null) {
            Unidata.util.UserDialog.showWarning('Не указаны класс и/или школа');
        } else {
            var store = this.getViewModel().getStore('studentsStore');
            store.load();
            store.filter('School', school);
            store.filter('Class', className);

            while (this.lookupReference('classList').items.items[0]) {
                this.lookupReference('classList').remove(this.lookupReference('classList').items.items[0]);
            }

            this.lookupReference('classList').add(
                {
                    xtype: 'grid',
                    title: 'Список класса',
                    store: store,
                    columns: [
                        {
                            xtype: 'checkcolumn',
                            text: 'Включить',
                            dataIndex: 'active',
                            width: 50,
                        }, {
                            text: 'Фамилия',
                            dataIndex: 'Last_Name',
                            flex: 1
                        }, {
                            text: 'Имя',
                            dataIndex: 'First_Name',
                            flex: 1
                        }, {
                            text: 'Школа',
                            dataIndex: 'School',
                            flex: 1
                        }, {
                            text: 'Класс',
                            dataIndex: 'Class',
                            width: 70,
                        }, {
                            text: 'Адрес',
                            dataIndex: 'Address_Text',
                            flex: 1
                        },
                    ],
                }
            )
        }
    },

    studentsStore: null,
    blacklist: [],

    onBuildButtonClick: function () {
        var school = this.lookupReference('schools').getValue();
        var className = this.lookupReference('classes').getValue();
        if (school === null || className === null) {
            Unidata.util.UserDialog.showWarning('Не указаны класс и/или школа');
        } else {
            this.addMapWidget();
            this.loadData(school, className);
            this.getYandexMatrix();
        }
    },

    onBuildMatrixButtonClick: function () {
        var school = this.lookupReference('schools').getValue();
        var className = this.lookupReference('classes').getValue();
        if (school === null || className === null) {
            Unidata.util.UserDialog.showWarning('Не указаны класс и/или школа');
        } else {
            this.addMapWidget();
            this.loadMatrixData(school, className);
        }
    },

    addMapWidget: function () {
        if (this.lookupReference('mapPanel')) {
            while (this.lookupReference('mapPanel').items.items[0]) {
                this.lookupReference('mapPanel').remove(this.lookupReference('mapPanel').items.items[0]);
            }
        }

        this.lookupReference('mainContainer').add(
            {
                xtype: 'panel',
                reference: 'mapPanel',
                title: 'Маршрут',
                width: 1176,
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                margin: '10 10 10 10',
                items: [
                    {
                        xtype: 'panel',
                        html: '<div id="yandex-map" style="height:400px;/*width:800px;*/"></div>\n',
                        title: 'Карта',
                        margin: '10 10 10 10',
                        itemId: 'yandexMap',
                        flex: 1,
                    },
                ]
            },
        );
    },

    loadData: function (school, className) {
        this.referencePoints = CUX.DataObtainer.obtainAddresses(school, className);
    },

    loadMatrixData: function (school, className) {
        this.referencePoints = CUX.DataObtainer.obtainAddresses(school, className);

        var points = this.referencePoints,
            matrix = CUX.DataObtainer.obtainMatrix(school, className);

        this.fillBlacklist();

        points = this.excludePoints(points);
        matrix = this.excludeMatrix(matrix);

        this.drawMap(CUX.dashboard.TSP.runTSP(points, matrix));
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
            var points = me.referencePoints,
                matrix = me.parseMatrix(geoCodeValues);

            me.fillBlacklist();

            points = me.excludePoints(points);
            matrix = me.excludeMatrix(matrix);

            me.drawMap(CUX.dashboard.TSP.runTSP(points, matrix));
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

    loadSchoolsStore: function () {
        var schools = this.getViewModel().getStore('schoolsStore');
        schools.load();
    },

    loadClassesStore: function () {
        var classes = this.getViewModel().getStore('classesStore');
        classes.load();
    },

    fillBlacklist: function () {
        if (this.studentsStore) {
            var items = this.studentsStore.data.items;
            for (var i = 0; i < items.length; i++) {
                if (!items[i].data.active) this.blacklist.push(i);
            }
        }
    },

    excludePoints: function (points) {
        Ext.each(this.blacklist, function (i) {
            points.splice(i + 1, 1);
        })
        return points;
    },

    excludeMatrix: function (matrix) {
        Ext.each(this.blacklist, function (i) {
            matrix.splice(i + 1, 1);
            Ext.each(matrix, function (row) {
                row.splice(i + 1, 1);
            })
        })
        return matrix;
    },

});
