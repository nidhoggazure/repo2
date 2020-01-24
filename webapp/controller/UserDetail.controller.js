sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";
	
	return Controller.extend("com.dudev.ProjectManagement.controller.UserDetail",{
		
		onInit: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("userDetailRoute").attachPatternMatched(this.onPageLoaded, this);
		},
		
		onPageLoaded: function(oEvent){
			this.oUserCode = oEvent.getParameter("arguments").code;
			this._loadDetail();
		},
		
		_loadDetail: function(){
			var oController = this;
			$.ajax({
				type: "GET",
				datatype: "json",
				cache: "false",
				url: "https://dudev.net/com.dudev.SDY/appi",
				data: {
					dvsn: "TASK",
					opn: "GTBU",
					c:	oController.oUserCode
				}
			}).done(function(oResponse){
				var oModel = new JSONModel(oResponse);
				oController.getView().setModel(oModel);
			}).fail(function(){
				//error	
			}).always(function(){
					//siempre corre
			});		
		},
		
		onBack: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("listRoute", null);
		},
		
		onAddTask: function(){
			this._getFormDialog().open();
		},
		
		_getFormDialog: function(){
			if(!this.oFormDialog){
				this.oFormDialog = sap.ui.xmlfragment("com.dudev.ProjectManagement.view.fragments.FormTask", this);
				this.getView().addDependent(this.oFormDialog);
			}
			
			return this.oFormDialog;
		},
		
		onCloseForm: function(){
			this._getFormDialog().close();
		},
		
		onSaveForm: function(){
			var oName = sap.ui.getCore().byId("txtTitleFTask").getValue();
			var oDate = sap.ui.getCore().byId("dpDateFTask").getValue();
			var oStatus = sap.ui.getCore().byId("cbStatusFTask").getSelectedKey();
			var oProgress = sap.ui.getCore().byId("slProgressFTask").getValue();
			
			var oController = this;
			$.ajax({
				type: "GET",
				datatype: "json",
				cache: "false",
				url: "https://dudev.net/com.dudev.SDY/appi",
				data: {
					dvsn: "TASK",
					opn: "AT",
					u:	oController.oUserCode,
					t:  oName,
					d:	oDate,
					s:  oStatus,
					p:	oProgress
				}
			}).done(function(oResponse){
				MessageToast.show(oResponse.message.code);
				oController.onCloseForm();
				oController._loadDetail();
			}).fail(function(){
				//error	
			}).always(function(){
					//siempre corre
			});		
		}
		
	});
});