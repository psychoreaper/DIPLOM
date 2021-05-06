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
