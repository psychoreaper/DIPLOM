Ext.define('CUX.dashboard.RouteMap', {
    extend: 'Ext.panel.Panel',
    //extend: 'Ext.container.Container',
    requires: [],
    alias: 'widget.routemap',

    title: 'Маршрут',
    width: 900,

    controller: 'routemap',
    viewModel: 'routemap',

    metaValues: null,
    referencePoints: [],
    matrix: null,
    sortedPoints: [],
    //
    // initComponent: function () {
    //     //this.callParent(arguments);
    // },

    // TODO: добавить элементов
    items: [
        {
            xtype: 'button',
            reference: 'btnBuild',
            width: 150,
            margin: '12 12 12 12',
            text: 'Построить',
            listeners: {
                click: 'onBuildButtonClick',
            },
        },
        {
            xtype: 'button',
            reference: 'btnMatrix',
            width: 150,
            margin: '12 12 12 12',
            text: 'Матрица',
            listeners: {
                click: 'onMatrixButtonClick',
            },
        },
        {
            xtype: 'process.task.custom.combo',
            emptyText: 'Школа',
            fieldLabel: 'Школа',
            labelAlign: 'top',
            labelSeparator: '',
            reference: 'schools',
            queryMode: 'local',
            flex: 1,
            width: 320,
            margin: '0 12 12 12',
            // bind: {
            //     store: '{branchOrgsStore}'
            // },
            // listeners: {
            //     expand: 'loadBranchStore'
            // }
        },
        {
            html: '<div id="yandex-map" style="height:400px;width:800px;"></div>\n',
            title: 'Карта',
            margin: '12 12 12 12',
            width: 800,
        }
    ]
});
