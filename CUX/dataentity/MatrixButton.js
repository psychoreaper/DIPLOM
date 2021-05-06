Ext.define('CUX.dataentity.MatrixButton', {
    singleton: true,

    requires: [
        'CUX.DataObtainer',
    ],

    onDataEntityDisplay: function (dataEntity) {
        if (Ext.isEmpty(dataEntity)) {
            return;
        }
        dataEntity.executeByDataAttributePath(
            this.addCustomButtonToAttribute,
            'Matrix',
            undefined,
            this
        );
    },

    addCustomButtonToAttribute: function (item) {
        var me = this,
            div,
            divTip,
            button;

        item.on('beforerender', function (item) {
            item.setDisableSimpleView(true);
        });
        item.on('render', function (item) {
            var dataRecord = item.dataRecord,
                input = this.getInput();

            if (Ext.isEmpty(input)) {
                return;
            }

            var parentDiv = input.getEl().getParent().getParent();
            this.getEl().setStyle({
                maxWidth: '813px'
            })
            parentDiv.setStyle({marginRight: '5px'});
            div = Ext.dom.Helper.insertAfter(
                input.getEl().getParent().getParent().getParent(),
                '<div></div>',
                true
            );
            div.setStyle({
                backgroundColor: '#507fba',
                height: '28px',
                width: '105px',
                lineHeight: '26px',
                borderRadius: '3px',
                textAlign: 'bottom',
                fontSize: '10px',
                color: 'white',
                cursor: 'pointer',
                marginLeft: 'auto',
                position: 'relation',
                display: 'content'
            });
            div.setHtml('<span style="margin-left:10px;font-weight:bold;vertical-align:text-bottom;">СФОРМИРОВАТЬ</span>');


            divTip = Ext.create('Ext.tip.ToolTip', {
                target: div.el,
                width: 270,
                html: '<b>Получить матрицу</b>'
            });

            div.on('mouseover', function (event) {
                Unidata.view.steward.dataentity.attribute.AbstractAttribute.tooltip.setDisabled(true);
                div.setStyle('backgroundColor', '#4370a9');
                divTip.show();
                divTip.focus();
            });

            div.on('mouseout', function () {
                Unidata.view.steward.dataentity.attribute.AbstractAttribute.tooltip.setDisabled(false);
                div.setStyle('backgroundColor', '#507fba');
                divTip.hide();
            });

            input.on('destroy', function () {
                divTip.destroy();
            });

            div.on('click', function () {
                var className = dataRecord.codeAttributes().getData().items[0].data.value,
                    school = me.getSimpleAttrValueByName(dataRecord, 'School', false),
                    addresses,
                    matrixPromise;

                if (school && className) {
                    addresses = CUX.DataObtainer.obtainAddresses(school, className);
                    matrixPromise = me.getMatrix(addresses)
                    matrixPromise.then(function (value) {
                        var matrixValue = addresses.length + ",";
                        matrixValue += value.toString();

                        if (value) {
                            input.setValue(matrixValue);
                            input.show();
                            input.fireEvent('blur');
                        } else {
                            Unidata.util.UserDialog.showWarning('Невозможно получить матрицу');
                        }
                    });
                }
                else {
                    Unidata.util.UserDialog.showWarning('Не указаны класс и/или школа');
                }
            });
        });
    },

    getMatrix: function (addresses) {
        return this.getYandexMatrix(addresses);
    },

    getYandexMatrix: function (points) {
        var me = this,
            route = [],
            n = points.length
        //result = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                route.push(new ymaps.route([points[i], points[j]]));
            }
        }

        var result = Promise.all(route).then(function (geoCodeValues) {
            return me.parseMatrix(geoCodeValues, n);
        });
        return result;
    },


    // getPromise: function (route) {
    //     return Promise.all(route)
    // },
    //
    // getResultFromPromise: function (route, n) {
    //     var me = this;
    //     return me.getPromise(route).then(function (geoCodeValues) {
    //         return me.parseMatrix(geoCodeValues, n);
    //     });
    // },

    parseMatrix: function (geoCodeValues, n) {
        var values = [],
            matrix = [];

        for (let i = 0; i < n; i++) {
            values.push(geoCodeValues.splice(0, n - 1));
            values[i] = values[i].reverse();
        }

        for (let i = 0; i < n; i++) {
            matrix.push([]);
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    matrix[i].push(Number.POSITIVE_INFINITY);
                    continue;
                }
                matrix[i].push(values[i].pop().getLength());
            }
        }
        return matrix;
    },

    getSimpleAttrValueByName: function (dataRecord, attrName, lookupEtalon) {
        var resultValue = undefined;

        if (dataRecord.simpleAttributes()
            && dataRecord.simpleAttributes().getData()
            && dataRecord.simpleAttributes().getData().items) {
            var foundAttrs = dataRecord.simpleAttributes().getData().items.filter(function (item) {
                return item.data.name === attrName
            });
            if (foundAttrs && foundAttrs.length > 0 && foundAttrs[0]) {
                var value = foundAttrs[0].get('value');
                resultValue = lookupEtalon ? (value ? foundAttrs[0].get('targetEtalonId') : undefined) : value;
            }
        }

        return resultValue;
    },
})
