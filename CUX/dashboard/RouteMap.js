Ext.define('CUX.dashboard.RouteMap', {
    extend: 'Ext.panel.Panel',
    //extend: 'Ext.container.Container',
    requires: [],
    alias: 'widget.routemap',

    title: 'Маршрутизация',
    width: 1200,

    controller: 'routemap',
    viewModel: 'routemap',
    itemId: 'routemap',

    metaValues: null,
    referencePoints: [],
    matrix: null,
    sortedPoints: [],

    items: [
        {
            xtype: 'container',
            width: 1200,
            layout: {
                type: 'hbox',
                align: 'stretch',
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'btnBuild',
                    flex: 1,
                    margin: '10 10 10 10',
                    text: 'Построить',
                    listeners: {
                        click: 'onBuildButtonClick',
                    },
                },
                {
                    xtype: 'button',
                    reference: 'btnBuildMatrix',
                    flex: 1,
                    margin: '10 10 10 10',
                    text: 'Построить из сохранённой матрицы',
                    listeners: {
                        click: 'onBuildMatrixButtonClick',
                    },
                },
                {
                    xtype: 'combo',
                    emptyText: 'Школа',
                    fieldLabel: 'Школа',
                    labelAlign: 'top',
                    labelSeparator: '',
                    reference: 'schools',
                    queryMode: 'local',
                    flex: 1,
                    margin: '0 10 10 10',
                    bind: {
                        store: '{schoolsStore}'
                    },
                    /*listeners: {
                        expand: 'loadSchoolsStore'
                    },*/
                    listeners: {
                        expand: 'onSchoolsExpand'
                    },
                    displayField: 'Name',
                    valueField: 'Name',
                },
                {
                    xtype: 'combo',
                    emptyText: 'Класс',
                    fieldLabel: 'Класс',
                    labelAlign: 'top',
                    labelSeparator: '',
                    reference: 'classes',
                    queryMode: 'local',
                    flex: 1,
                    margin: '0 10 10 10',
                    bind: {
                        store: '{classesStore}'
                    },
                    /*listeners: {
                        expand: 'loadClassesStore'
                    },*/
                    listeners: {
                        expand: 'filterClassContent',
                        select: 'filterSchoolContent'
                    },
                    displayField: 'Name',
                    valueField: 'Name',
                },
            ]
        },


        {
            xtype: 'panel',
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
                    flex: 3,
                },
                {
                    xtype: 'panel',
                    html: '',
                    //title: 'Маршрут в текстовом виде',
                    margin: '10 10 10 10',
                    itemId: 'routeText',
                    flex: 1,
                },
            ]
        },
    ]
});
