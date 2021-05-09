Ext.define('CUX.dashboard.RouteMapProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.routemap',
    url: Unidata.Config.getMainUrl() + 'internal/search',

    paramsAsJson: true,

    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST'
    },

    extraParams: {},

    reader: {
        type: 'json',
        transform: {
            fn: function (data) {
                var result = [];
                var activeHits = data.hits.filter(function (item) {
                    return item.status === 'ACTIVE'
                });
                if (activeHits && activeHits.length > 0) {
                    Ext.each(activeHits, function (hit) {
                        if (hit.preview) {
                            // если у нас есть адрес и просто имя - это школа
                            if ((hit.preview.filter(function (item) {
                                return item.field === 'Address_Text';
                            }).length !== 0) && (hit.preview.filter(function (item) {
                                return item.field === 'Name';
                            }).length !== 0)
                            ) {

                                result.push({
                                    Name: hit.preview.filter(item => {
                                        return item.field === 'Name'
                                    })[0].value,
                                    Address_Text: hit.preview.filter(item => {
                                        return item.field === 'Address_Text'
                                    })[0].value,
                                    Address_Coord: hit.preview.filter(item => {
                                        return item.field === 'Address_Coord'
                                    })[0].value
                                });

                            }
                            // если у нас есть просто имя и школа - это класс
                            else if ((hit.preview.filter(function (item) {
                                return item.field === 'School';
                            }).length !== 0) && (hit.preview.filter(function (item) {
                                return item.field === 'Name';
                            }).length !== 0)
                            ) {
                                result.push({
                                    Name: hit.preview.filter(item => {
                                        return item.field === 'Name'
                                    })[0].value,
                                    School_Text: hit.preview.filter(item => {
                                        return item.field === 'School'
                                    })[0].value,
                                });

                            } else {
                                result.push({
                                    Last_Name: hit.preview.filter(item => {
                                        return item.field === 'Last_Name'
                                    })[0].value,
                                    First_Name: hit.preview.filter(item => {
                                        return item.field === 'First_Name'
                                    })[0].value,
                                    School: hit.preview.filter(item => {
                                        return item.field === 'School'
                                    })[0].value,
                                    Class: hit.preview.filter(item => {
                                        return item.field === 'Class'
                                    })[0].value,
                                    Address_Text: hit.preview.filter(item => {
                                        return item.field === 'Address_Text'
                                    })[0].value,
                                    active: true
                                })
                            }
                        }
                    });
                }
                return result;
            }
        }
    },
})
