Ext.define('CUX.dataentity.DataEntity', {

    override: 'Unidata.uiuserexit.overridable.dataentity.DataEntity',

    requires: [
        'CUX.dataentity.MatrixButton',
    ],

    onDataEntityDisplay: function (dataEntity) {
        CUX.dataentity.MatrixButton.onDataEntityDisplay(dataEntity);
    },
});
