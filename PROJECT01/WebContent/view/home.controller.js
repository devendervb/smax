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
					 onInit: function() {
					
					},
					onAddressTyped: function(oEvent){
						var sTerm = oEvent.getParameter("suggestValue");
						myAddress = oEvent.getSource();
						myview = this.getView();
						if (sTerm.length >= 8){
							var aFilters = [];
						    if (sTerm) {	    
						    // google place URL for Ajax call
						   	var url = "proxy/http/maps.googleapis.com/maps/api/geocode/json?address=" + sTerm + "&sensor=false"			    
						     var oModel1 = new sap.ui.model.json.JSONModel(); 			     
						     //Ajax Call Google Place API with Callback function and JSONP data type     
					          $  
					                              .ajax({  
					                                        url : url,  
					                                        jsonpCallback : 'getJSON',  
					                                        contentType : "application/json",  
					                                        dataType : 'json',  
					                                        success : function(data, textStatus, jqXHR) {  
					                                         // set formatted address Json file to Odata Modle        
					                                        	oModel1.setData(data);  
					                                                  //sap.ui.getCore().setModel(oModel1);
					                                        	myview.setModel(oModel1);
					                                           // Binding formatted address with suggestion items 
					                                                  
					                                                  aFilters.push(new sap.ui.model.Filter("formatted_address", sap.ui.model.FilterOperator.Contains, ""));
					                                		      //    oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
					                                          //      console.log("Source");
					                                         //  myAddress.getBindingContext();
					                                                  myAddress.getBinding("suggestionItems").filter(aFilters);
					                                        }
					                              });
					          	          
						};    
					};
					},
				});// },
