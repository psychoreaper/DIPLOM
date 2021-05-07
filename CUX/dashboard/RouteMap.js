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
                type: 'vbox',
            },
            reference: 'mainContainer',
            items: [
                {
                    xtype: 'container',
                    reference: 'paramsContainer',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                    },
                    width: 1176,
                    margin: '0 10 0 10',
                    items: [
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
                            listeners: {
                                expand: 'filterClassContent',
                                select: 'filterSchoolContent'
                            },
                            displayField: 'Name',
                            valueField: 'Name',
                        },
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
                            text: 'Построить из матрицы',
                            listeners: {
                                click: 'onBuildMatrixButtonClick',
                            },
                        },
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'listContainer',
                    layout: {
                        type: 'hbox'
                    },
                    width: 1176,
                    items: [
                        {
                            xtype: 'button',
                            reference: 'btnList',
                            margin: '10 10 10 10',
                            text: 'Загрузить список',
                            flex: 1,
                            height: 36,
                            listeners: {
                                click: 'onListButtonClick',
                            },
                        }, {
                            xtype: 'panel',
                            title: 'Исключить адреса учеников из маршрута',
                            collapsible: true,
                            collapsed: true,
                            width: 1000,
                            margin: '10 10 10 10',
                            reference: 'classList',
                        },
                    ]
                }
            ]
        },
    ],
});
