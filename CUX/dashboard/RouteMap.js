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
                            title: 'Изменить список класса',
                            collapsible: true,
                            collapsed: true,
                            width: 1000,
                            margin: '10 10 10 10',
                            items: [
                                {
                                    xtype: 'grid',
                                    title: 'Список класса',
                                    store: this.store,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            text: '???',
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

                                    //width: 780,
                                }
                            ]
                        },]
                }
            ]
        },


    ],
    store: null,

    getStore: function () {
        var school = 'Гимназия № 24 имени И.А. Крылова',
            className = '3Б',
            data = CUX.DataObtainer.loadStudentsData('search?_dc=' + Number(new Date()), {
                asOf: CUX.DataObtainer.getDefaultDateStr(),
                count: 30,
                countOnly: false,
                entity: "Student",
                fetchAll: true,
                page: 1,
                start: 0,
                searchFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
                returnFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
                //formFields: formFields,
            }, school, className),
            array = [],
            store;

        Ext.each(data, function (i) {
            array.push({
                Last_Name: i.filter(item => {
                    return item.field === 'Last_Name'
                })[0].value,
                First_Name: i.filter(item => {
                    return item.field === 'First_Name'
                })[0].value,
                School: i.filter(item => {
                    return item.field === 'School'
                })[0].value,
                Class: i.filter(item => {
                    return item.field === 'Class'
                })[0].value,
                Address_Text: i.filter(item => {
                    return item.field === 'Address_Text'
                })[0].value,
                active: true
            })
        });

        store = Ext.create('Ext.data.Store', {
            fields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", 'active'],
            data: array,
        });

        return store;
    },

});
