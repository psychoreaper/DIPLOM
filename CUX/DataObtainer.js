Ext.define('CUX.DataObtainer', {
    singleton: true,

    obtainAddresses: function (school, className) {
        var referencePoints = [],
            schoolData,
            studentsData;
        //formFields = [];

        // formFields.push({
        //     inverted: false,
        //     name: "School",
        //     searchType: "EXACT",
        //     type: "String",
        //     value: school
        // })

        schoolData = this.loadSchoolData('search?_dc=' + Number(new Date()), {
            "asOf": "2021-04-29T00:00:00.000",
            "count": 30,
            "countOnly": false,
            "entity": "School",
            "fetchAll": true,
            "page": 1,
            "start": 0,
            "searchFields": ["Name"],
            "returnFields": ["Name", "Address_Text", "Address_Coord"],
            //"formFields": formFields,
        }, school);

        referencePoints.push(schoolData[0].filter(item => {
            return item.field === 'Address_Text'
        })[0].value);

        studentsData = this.loadStudentsData('search?_dc=' + Number(new Date()), {
            asOf: this.getDefaultDateStr(),
            count: 30,
            countOnly: false,
            entity: "Student",
            fetchAll: true,
            page: 1,
            start: 0,
            searchFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
            returnFields: ["Last_Name", "First_Name", "School", "Class", "Address_Text", "Address_Coord"],
            //formFields: formFields,
        }, school, className);

        studentsData.forEach(i => {
            referencePoints.push(i.filter(item => {
                return item.field === "Address_Text"
            })[0].value)
        });

        return referencePoints;
    },

    obtainMatrix: function (school, className) {
        var result = null,
            classData;

        classData = this.loadClassData('search?_dc=' + Number(new Date()), {
            asOf: this.getDefaultDateStr(),
            count: 30,
            countOnly: false,
            entity: "Class",
            fetchAll: true,
            page: 1,
            start: 0,
            searchFields: ["Name", "School"],
            returnFields: ["Name", "School", "Matrix"],
            //formFields: formFields,
        }, school, className);

        Ext.each(classData, function (i) {
            result = i.filter(item => {
                return item.field === 'Matrix'
            })[0].value
        })

        return this.makeMatrix(result);
    },

    loadStudentsData: function (endpoint, config, school, className) {
        var me = this,
            hits = [],
            result = [];

        Ext.Ajax.request({
            url: Unidata.Config.getMainUrl() + 'internal/search'/* + endpoint*/,
            async: false,
            method: 'POST',
            jsonData: config,
            success: function (response) {
                hits = JSON.parse(response.responseText).hits.map(x => {
                    return x.preview
                });
                hits.forEach(i => {
                    if ((i.filter(item => {
                            return item.field === 'School'
                        })[0].value === school) &&
                        (i.filter(item => {
                            return item.field === 'Class'
                        })[0].value === className)) {
                        result.push(i)
                    }
                })
            }
        });
        return result;
    },

    loadSchoolData: function (endpoint, config, school) {
        var me = this,
            hits = [],
            result = [];
        Ext.Ajax.request({
            url: Unidata.Config.getMainUrl() + 'internal/search'/* + endpoint*/,
            async: false,
            method: 'POST',
            jsonData: config,
            success: function (response) {
                hits = JSON.parse(response.responseText).hits.map(x => {
                    return x.preview
                });
                hits.forEach(i => {
                    if (i.filter(item => {
                        return item.field === 'Name'
                    })[0].value === school) {
                        result.push(i)
                    }
                })
            }
        });
        return result;
    },

    loadClassData: function (endpoint, config, school, className) {
        var me = this,
            hits = [],
            result = [];
        Ext.Ajax.request({
            url: Unidata.Config.getMainUrl() + 'internal/search'/* + endpoint*/,
            async: false,
            method: 'POST',
            jsonData: config,
            success: function (response) {
                hits = JSON.parse(response.responseText).hits.map(x => {
                    return x.preview
                });
                hits.forEach(i => {
                    if ((i.filter(item => {
                        return item.field === 'Name'
                    })[0].value === className) && (i.filter(item => {
                        return item.field === 'School'
                    })[0].value === school)) {
                        result.push(i)
                    }
                })
            }
        });
        return result;
    },

    getDefaultDateStr: function () {
        var date = new Date();
        return this.getDateStr(date) + "T00:00:00.000";
    },

    getDateStr: function (date) {
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        return year + '-' + month + '-' + day;
    },

    makeMatrix: function (string) {
        var initial = string.split(",").map(x => {return parseFloat(x)}),
            n = initial[0],
            result = [];

        initial = initial.splice(1, initial.length);
        for (var i = 0; i < n; i++) {
            result.push(initial.splice(0, n));
        }

        return result;
    },
})
