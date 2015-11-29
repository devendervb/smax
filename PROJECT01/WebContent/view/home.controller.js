sap.ui
		.controller(
				"b6.help.view.home",
				{
					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf view.home
					 */
					onInit : function() {

					},

					onAddressTyped : function(oEvent) {
						var sTerm = oEvent.getParameter("suggestValue");
						myAddress = oEvent.getSource();
						myview = this.getView();
						if (sTerm.length >= 8) {
							var aFilters = [];
							if (sTerm) {
								// google place URL for Ajax call
								var url = "proxy/http/maps.googleapis.com/maps/api/geocode/json?address="
										+ sTerm + "&sensor=false"
								var oModel1 = new sap.ui.model.json.JSONModel();
								// Ajax Call Google Place API with Callback
								// function and JSONP data type
								$
										.ajax({
											url : url,
											jsonpCallback : 'getJSON',
											contentType : "application/json",
											dataType : 'json',
											success : function(data,
													textStatus, jqXHR) {

												oModel1.setData(data);
												myview.setModel(oModel1);
												aFilters
														.push(new sap.ui.model.Filter(
																"formatted_address",
																sap.ui.model.FilterOperator.Contains,
																""));

												myAddress.getBinding(
														"suggestionItems")
														.filter(aFilters);
											}
										});
							}
							;
						}
						;
					},

					signup : function() {
						// debugger;
						this.onOpenDialog();
						var oIconTabBar = sap.ui.getCore().byId("idIconTabBar");
						oIconTabBar.setSelectedKey("keySignUp");
					},

					signin : function() {
						// debugger;
						this.onOpenDialog();
						var oIconTabBar = sap.ui.getCore().byId("idIconTabBar");
						oIconTabBar.setSelectedKey("keySignIn");
					},

					close : function() {
						this.onCloseDialog();
					},

					_getDialog : function() {
						// create dialog lazily
						if (!this._oDialog) {
							// create dialog via fragment factory
							this._oDialog = sap.ui.xmlfragment(
									"fragment.login", this);

							this.getView().addDependent(this._oDialog);
						}
						return this._oDialog;
					},

					onOpenDialog : function() {
						this._getDialog().open();

					},

					onCloseDialog : function() {
						this._getDialog().close();
					},

					register : function() {

						var oEntry = {};
						oEntry.Name = sap.ui.getCore().byId("idName")
								.getValue();
						oEntry.Email = sap.ui.getCore().byId("idEmail")
								.getValue();
						oEntry.Mobile = sap.ui.getCore().byId("idMobile")
								.getValue();
						oEntry.Password = sap.ui.getCore().byId("idPassword")
								.getValue();
						var url = "proxy/http/smax.serveexchange.com:8000/sap/opu/odata/sap/ZHELP_GW_USER_INFO_SRV/"
						var oModel = new sap.ui.model.odata.v2.ODataModel(url);
						debugger;
						oModel
								.create(
										"/UserDetailsSet",
										oEntry,
										{
											success : function(oData, response) {
												// need to close the dialog box
												// this._getDialog().close();
												//debugger;
												new sap.m.MessageToast.show(
														"Thank you for Registration");
											},
											failed : function(oData, response) {
												alert("Failed to get InputHelpValues from service!");
											}
										})
					//	debugger;

					},
					signIn : function() {
					//	alert("testing");
						var oEntry = {};
						oEntry.Name = sap.ui.getCore().byId("idName")
								.getValue();
						oEntry.Email = sap.ui.getCore().byId("idEmail")
								.getValue();
						oEntry.Mobile = sap.ui.getCore().byId("idMobile")
								.getValue();
						oEntry.Password = sap.ui.getCore().byId("idPassword")
								.getValue();

					},

					showOrphList : function() {
						var url = "proxy/http/smax.serveexchange.com:8000/sap/opu/odata/sap/ZHELP_GW_USER_INFO_SRV/"
							var oModel = new sap.ui.model.odata.v2.ODataModel(url);
							oModel
									.read(
											"/UserDetailsSet",
											oEntry,
											{
												success : function(oData, response) {
													// need to close the dialog box
													// this._getDialog().close();
													app = this.getView().getParent();
													app.to("app--idList");
											//		new sap.m.MessageToast.show(
											//				"Thank you for Registration");
												},
												failed : function(oData, response) {
													alert("We are not able to fetch required Orphanage Details, contact us at ");
												}
											})
						app = this.getView().getParent();
						app.to("app--idList");

					}

				});
