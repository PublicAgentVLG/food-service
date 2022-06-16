sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"food-service/food-service/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("food-service.food-service.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.system.desktop) {
					this._sContentDensityClass = "sapUiSizeCozy";
				} else {
					this._sContentDensityClass = "sapUiSizeCompact";
				}
			}
			return this._sContentDensityClass;
		}
	});
});