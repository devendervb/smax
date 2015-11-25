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
//						var sServiceUrl = "proxy/http/smax.serveexchange.com:8000/sap/opu/odata/sap/ZHH_GW_USER_INFO_SRV/UserSet";
//						var oModel = new sap.ui.model.odata.ODataModel(
//								sServiceUrl, true);
//
//						var oJsonModel = new sap.ui.model.json.JSONModel();
//
//						oModel.read("/UserSet?", null, null, true,
//								function(oData, repsonse) {
//									oJsonModel.setData(oData);
//								});
//						sap.ui.getCore().setModel(oJsonModel);

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
												// set formatted
												// address Json
												// file to Odata
												// Modle
												oModel1.setData(data);
												// sap.ui.getCore().setModel(oModel1);
												myview.setModel(oModel1);
												// Binding
												// formatted
												// address with
												// suggestion
												// items

												aFilters
														.push(new sap.ui.model.Filter(
																"formatted_address",
																sap.ui.model.FilterOperator.Contains,
																""));
												// oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
												// console.log("Source");
												// myAddress.getBindingContext();
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

					login : function() {
						this.onOpenDialog();
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
							// connect dialog to view (models, lifecycle)
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

//						OData
//								.request(
//										{
//											requestUri : "proxy/http/smax.serveexchange.com:8000/sap/opu/odata/sap/ZHH_GW_USER_INFO_SRV/UserSet",
//											method : "GET",
//											headers : {
//												"X-Requested-With" : "XMLHttpRequest",
//												"Content-Type" : "application/atom+xml",
//												"DataServiceVersion" : "2.0",
//												"X-CSRF-Token" : "Fetch"
//											}
//										},
//										function(data, response) {
//											header_xcsrf_token = response.headers['x-csrf-token'];
//											var oHeaders = {
//												"x-csrf-token" : header_xcsrf_token,
//												'Accept' : 'application/json',
//											};
//
//											OData
//													.request(
//															{
//																requestUri : "proxy/http/smax.serveexchange.com:8000/sap/opu/odata/sap/ZHH_GW_USER_INFO_SRV/UserSet",
//
//																method : "POST",
//																headers : oHeaders,
//																data : oEntry
//															},
//															function(data,
//																	request) {
//																alert("User Created Successfully");
//																location
//																		.reload(true);
//															},
//															function(err) {
//																alert("User Creation Failed");
//															});
//										}, function(err) {
//											var request = err.request;
//											var response = err.response;
//											alert("Error in Get -- Request "
//													+ request + " Response "
//													+ response);
//										});
					},

				});
