/**
 * @author Sergey Minakov
 * @date 2020-03-27
 * @version 1.9
 * @Confluence 324141087
 */

Ext.define('CUX.dashboard.CustomCombo', {

    extend: 'Ext.form.field.ComboBox',

	alias: 'widget.process.task.custom.combo',

	width: 250,
	editable: false,
	ui: 'un-field-default',
	displayField:'Name',
	valueField: 'Code',
	store: {},
	multiSelect: true,
	delimiter: ',',
	displayTpl : '<tpl for=".">' +
					'{[(parent.findIndex(function(item) {return item["Code"] === "0";}) > -1) ? (xindex === 1 ? "Все" : " ") : values["Name"] + (xindex < xcount ? "," : "")]}' +
				'</tpl>',
	listeners: {
		select: function (combo, record, opts) {
			var last = combo.lastSelection.map(function (item) {return item.get('Code')});
			var current = combo.value;
			if (!last.includes('0') && current.includes('0') || (
				!last.includes('0') && !current.includes('0') && combo.getStore().getData().items.length === current.length + 1
				)) {
				combo.setValue(combo.getStore().getData().items);
				return;
			}
			if (last.includes('0') && current.includes('0') && current.length < last.length) {
				var findItems = combo.getStore().getData().items.filter(function(item) {return item.data.Code !== '0' && current.includes(item.data.Code);});
				combo.setValue(findItems);
				return;
			}
			if (last.includes('0') && !current.includes('0')) {
				combo.setValue([]);
				return;
			}
		}						
	},	
	
	
	initComponent: function () {
        this.callParent(arguments);
    },


});
