Ext.define('CUX.dashboard.RouteMapProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.routemap',
    url: Unidata.Config.getMainUrl() + 'internal/search',

    paramsAsJson: true,

    actionMethods : {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST'
    },

    extraParams : {
    },

    reader: {
        type: 'json',
        transform: {
            fn: function (data) {
                var result = [];
                var activeHits = data.hits.filter(function (item) {return item.status === 'ACTIVE'});
                if (activeHits && activeHits.length > 0) {
                    Ext.each(activeHits, function (hit) {
                        if (hit.preview) {
                            // TODO: добавить здесь проверку на то, откуда прилетело
                            if (hit.preview.filter(function (item) {return item.field==='Address_Text';}).length !== 0) {
                                var nameField = hit.preview.filter(function (item) {
                                    return item.field === 'Name';
                                });
                                var textField = hit.preview.filter(function (item) {
                                    return item.field === 'Address_Text';
                                });
                                var coordField = hit.preview.filter(function (item) {
                                    return item.field === 'Address_Coord';
                                });
                                if (nameField && nameField[0] && textField && textField[0] && coordField && coordField[0]) {
                                    result.push({
                                        Name: nameField[0].value,
                                        Address_Text: textField[0].value,
                                        Address_Coord: coordField[0].value
                                    });
                                }
                            } else {
                                var nameField = hit.preview.filter(function (item) {
                                    return item.field === 'Name';
                                });
                                var schoolField = hit.preview.filter(function (item) {
                                    return item.field === 'School';
                                });
                                if (nameField && nameField[0] && schoolField && schoolField[0]) {
                                    result.push({
                                        Name: nameField[0].value,
                                        School_Text: schoolField[0].value,
                                    });
                                }
                            }
                        }
                    });
                }
                return result;
            }
        }
    },
})
