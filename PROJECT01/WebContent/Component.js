// declare the component
jQuery.sap.declare("b6.help.Component");

//extend the component
sap.ui.core.UIComponent.extend("b6.help.Component", {
	createContent : function(){
		var App = sap.ui.view({
			id : "app",
			viewName : "b6.help.view.App",
			type : sap.ui.core.mvc.ViewType.XML
		});
	return App;
	}
});