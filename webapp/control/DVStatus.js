sap.ui.define([
	"sap/ui/core/Control"
],function(Control){
	"use strict";
	
	return Control.extend("com.dudev.ProjectManagement.control.DVStatus",{
		
		//Properties
		metadata: {
			properties: {
				text: {
					type: "string",
					defaultValue: ""
				},
				color:{
					type: "string",
					defaultValue: "#CCCCCC"
				}
			}
		},
		
		renderer: function(oRm, oControl){
			oRm.write('<div class="dvStatus id="'+oControl.getId()+'-dvStatus" style="background-color:'+oControl.getColor()+';"');
			oRm.writeControlData(oControl);
			oRm.write('>');
			oRm.write('<p class="dvStatus-text">'+oControl.getText()+'</p>');
			oRm.write('</div>');
		}
	});
	
});