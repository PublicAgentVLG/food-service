sap.ui.define([
	"food-service/food-service/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/BusyIndicator",
	"jquery.sap.global"
	], function(BaseController,MessageToast,JSONModel,Filter,FilterOperator,BusyIndicator,jQuery) {
	"use strict";
	
	/**
	 * @class
	 * @extends sap.ui.core.mvc.BaseController
	 *
	 * @constructor
	 * @public
	 * @alias zgagarin.zsupplyproc.controller.tabs.General
	 */
	const thisController = BaseController.extend("food-service.food-service.controller.DemandOffer",
		/** @lends zgagarin.zsupplyproc.controller.tabs.General.prototype */
		{
			_busyIndicator:null,
			onInit: function () {
				var oModel = new JSONModel(jQuery.sap.getModulePath("food-service.food-service", "/model/stateModel.json"));
				this.getView().setModel(oModel, "mainModel");
				this.getRouter().getRoute("main").attachPatternMatched(this._onObjectMatched, this);
			},
			
			_onObjectMatched:function(oControlEvent){
				console.log("++");
			},
			test:function(oEvent){
				$.ajax({url:"./SevenWonders"}).done(function(data,status,jqxhr){
					var oData=data;
				});
			},
            navToMenu:function(oEvent){
                this.getRouter().navTo("menu");
            },
			onToRegist:function(oEvent){
				this.getRouter().navTo("registration");
			},
			complite:function(oEvent){
				this.getRouter().navTo("currentMenu");
			},
		});

	$.extend(true, thisController.prototype);
	return thisController;
});
