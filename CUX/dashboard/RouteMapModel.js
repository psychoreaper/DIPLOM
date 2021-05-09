Ext.define('CUX.dashboard.RouteMapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.routemap',

    stores: {
        schoolsStore: {
            fields: ["Name", "Address_Text", "Address_Coord"],
            storeId: 'schoolsStore',
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
        studentsStore: {
            fields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", 'active'],
            storeId: 'studentsStore',
            proxy: {
                type: 'routemap',
                extraParams: {
                    countOnly: false,
                    entity: "Student",
                    fetchAll: true,
                    page: 1,
                    start: 0,
                    searchFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
                    returnFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
                }
            },
        }
    }
})
