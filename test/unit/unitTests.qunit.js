/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"food-service/food-service/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});