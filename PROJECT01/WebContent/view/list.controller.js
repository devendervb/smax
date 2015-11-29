sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, MessageToast, Controller, JSONModel) {
	"use strict";

	var ListController = Controller.extend("b6.help.view.list", {

		onInit: function () {
			// set mock model
		//	var sPath = jQuery.sap.getModulePath("com.sap.venky", "/data.json")
			var oModel = new JSONModel("model/data.json");
			this.getView().setModel(oModel);
		},

		onPress: function (oEvent) {
			MessageToast.show("Clicked on " + oEvent.getSource().getSender());
		}
	});


	return ListController;

});
