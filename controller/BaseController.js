sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/BusyDialog"
], function (Controller,MessageToast,BusyDialog) {
	"use strict";

	/**
	 * @class
	 * @extends sap.ui.core.mvc.Controller
	 *
	 * @constructor
	 * @public
	 * @alias zgagarin.zsupplyproc.controller.BaseController
	 */
	var BaseController = Controller.extend(
		"food-service.food-service.controller.BaseController",
		/** @lends zgagarin.zsupplyproc.controller.BaseController.prototype */
		{
			_oBusy: new BusyDialog,
			/**
			 * Инициализирует контроллер, вызывает метод в котором определенным контролам присваиваются функции обработки события изменения.
			 */
			onInit: function () {
				this.attachFieldChangeHandler();
			},
			openBusyDialog:function(){
				this._oBusy.open();
			},
			closeBusyDialog:function(){
				this._oBusy.close();
			},
			/**
			 * Возвращает объект роутинга.
			 * @returns {Object}
			 */
			getRouter: function () {
				return this.getOwnerComponent().getRouter();
			},
			/**
			 * Возвращает модель.
			 * @param {string} sName Название модели.
			 * @returns {Object}
			 */
			getModel: function (sName) {
				return (this.getOwnerComponent()) ? this.getOwnerComponent().getModel(sName) : this.getView().getModel(sName);
			},
			/**
			 * Устанавливает или сбрасывает модель на задаваемую модель для конкретного компонента или страницы (View).
			 * @param {sap.ui.model.Model} oModel Устанавливаемая модель или null или undefined.
			 * @param {string} [sName] Имя модели, либо undefined.
			 * @returns {*}
			 */
			setModel: function (oModel, sName) {
				const oSource = (this.getOwnerComponent()) ? this.getOwnerComponent() : this.getView();
				return oSource.setModel(oModel, sName);
			},
			/**
			 * Возвращает конкретное свойство "state" модели.
			 * @param {string} sProperty Путь к свойству.
			 * @returns {*}
			 */
			getStateProperty: function (sProperty) {
				if (this.getModel("state")) {
					return this.getModel("state").getProperty(sProperty);
				}
			},
		});

	return BaseController;
});
