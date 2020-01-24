sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.dudev.ProjectManagement.controller.UserList", {
		// isMock: false,
		isMock: true,
		
		onInit: function () {
			if (this.isMock) {
				this._loadJSON();
			} else {
				this._loadTeamWs();
			}
		},
		
		_loadJSON: function (){
		var oController = this;
		
			$.getJSON("./model/mock/team.json", function(json){
				var oModel = new JSONModel(json);
				oController.getView().byId("tabTeam").setModel(oModel);
			});
		},
		
		_loadTeamWs: function (){
			var oController = this;
			$.ajax({
				type: "GET",
				datatype: "json",
				cache: "false",
				url: "https://dudev.net/mock/team.php"
				}).done(function(oResponse){
					var oModel = new JSONModel(oResponse);
					oController.getView().byId("tabTeam").setModel(oModel);
				}).fail(function(){
				//error	
				}).always(function(){
					//siempre corre
				});	
		},
		
		onSearch: function (){
			var data = this.getView().byId("txtSearch").getValue();
			var oTable = this.getView().byId("tabTeam");
			
			var oBiding = oTable.getBinding("items");
			oBiding.filter([new sap.ui.model.Filter([
				new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, data),
				new sap.ui.model.Filter("Email", sap.ui.model.FilterOperator.Contains, data)
				], false)]);
		},
		
		_getVal: function (evt){
			return sap.ui.getCore().byId(evt.getParameter('id')).getValue();
		},
		
		_triggerEmail: function (evt){
			sap.m.URLHelper.triggerEmail(this._getVal(evt), "Solicitud de información");
		},
		
		onSelect: function (oEvent){
		 	var oObject = oEvent.getSource().getBindingContext().getObject();
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		 	oRouter.navTo("userDetailRoute",{code: oObject.Code});
		}
	});
});