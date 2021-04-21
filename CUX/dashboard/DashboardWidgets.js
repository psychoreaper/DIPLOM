/**
 * @author Sergey Minakov
 * @date 2020-03-27
 * @version 1.28
 * @Confluence 324141087
 */

Ext.define('CUX.dashboard.DashboardWidgets', {
    override: 'Unidata.uiuserexit.overridable.dashboard.DashboardWidgets',
    requires: [
        'CUX.dashboard.RouteMap',
        'CUX.dashboard.Game2048',
    ],

    /**
     * @typedef {Object} WidgetItem
     * @property {string} text - Название виджета, отображается в меню выбора
     * @property {Object} widget - Конфигурационный объект виджета
     */
    /**

     * Список доступных виджетов
     * @see Unidata.uiuserexit.overridable.dashboard.DashboardWidgets.editWidgetsList
     *
     * @param {WidgetItem[]} widgets
     */
    editWidgetsList: function (widgets) {
        widgets.push(
            {
                text: 'Карта',
                widget: {
                    xtype: 'routemap'
                }
            },
            {
                text: '2048',
                widget: {
                    xtype: 'game2048'
                }
            },
        );
    }
});
