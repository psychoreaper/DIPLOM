Ext.define('CUX.dashboard.RouteMapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.routemap',

    stores: {
        schoolsStore: {
            proxy: {
                type: 'routemap',
                extraParams: {
                    countOnly: false,
                    entity: "School",
                    fetchAll: true,
                    page: 1,
                    start: 0,
                    searchFields: ['Name'],
                    returnFields: ['Name', 'Address_Text', 'Address_Coord'],
                },
            },
            fields: ["Name", "Address_Text", "Address_Coord"],
            storeId: 'schoolsStore',
            // data: [
            //     {Name: 'Гимназия 24', Address_Text: 'Средний проспект, 20', Address_Coord: '59.943884, 30.281955'},
            //     {Name: 'Лицей 470', Address_Text: 'улица Бутлерова, 22А', Address_Coord: '60.003637, 30.397462'},
            // ]
        },
        classesStore: {
            fields: ["Name", "School"],
            storeId: 'classesStore',
            proxy: {
                type: 'routemap',
                extraParams: {
                    countOnly: false,
                    entity: "Class",
                    fetchAll: true,
                    page: 1,
                    start: 0,
                    searchFields: ['Name'],
                    returnFields: ['Name', 'School'],
                },
            },
        },
        /*studentsStore: {
            proxy: {
                extraParams: {
                    countOnly: false,
                    entity: "Student",
                    fetchAll: true,
                    page: 1,
                    start: 0,
                    returnFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
                },
            },
            fields: ["Last_Name", "First_Name", "Address_Text", "Address_Coord"],
            storeId: 'studentsStore',
        }*/
    }
})
