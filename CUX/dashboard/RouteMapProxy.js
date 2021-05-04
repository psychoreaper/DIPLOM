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
                /*var result = [{Code: '0', Name: 'Все'}];
                var activeHits = data.hits.filter(function (item) {return item.status === 'ACTIVE'});
                if (activeHits && activeHits.length > 0) {
                    Ext.each(activeHits, function (hit) {
                        if (hit.preview) {
                            var nameField = hit.preview.filter(function(item) {return item.field === 'Name';});
                            var codeField = hit.preview.filter(function(item) {return item.field === 'Code';});
                            if (nameField && nameField[0] && codeField && codeField[0]) {
                                result.push({
                                    Name: nameField[0].value,
                                    Code: codeField[0].value
                                });
                            }
                        }
                    });
                }
                return result;*/
                console.log(data);
            }
        }
    },
})
