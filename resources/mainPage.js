


    //    alert("Inside Tile JS");

       	  jQuery.sap.require("sap.ui.core.IconPool");

       	  
       	  var url;

			// create the data
			
			var aData = {
					feedEntries: [ {
							
/* 							title: "http://scn.sap.com/community/feeds/blogs",
							description: "SCN Blog Posts",
							icon: "sap-icon://employee", */
							
							title: "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18",
							description: "Maalai Malar - Head Lines",
							icon: "sap-icon://employee",							

						}, {
							
							title: "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=19&Main=18",
							description: "Maalai Malar - Head Lines",
							icon: "sap-icon://documents",
						
						}, {
							
							title: "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=114&Main=2",
							description: "Maalai Malar - Cinema",
							icon: "sap-icon://discussion",
						
						},{
							
							title: "http://scn.sap.com/community/developer-center/front-end/blog/feeds/posts",
							description: "SAPUI5 Space Blogs",
							icon: "sap-icon://dimension",
				
						}, 
						
						{
							
							title: "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=114&Main=2",
							description: "Maalai Malar - Cinema Kisu Kisu",
							icon: "sap-icon://display",
				
						},
						
						
						/*
						{
							
							
							title: "http://scn.sap.com/community/feeds/unansweredthreads",
							description: "Unanswered Questions",
							icon: "sap-icon://search",
				
						}, 
							{
							
							title: "http://scn.sap.com/community/feeds/popularthreads",
							description: "Popular Discussions",
							icon: "sap-icon://discussion-2",
				
						}, 
						
						{
						    title: "http://scn.sap.com/community/feeds/messages",
							description: "Discussion Messages",
							icon: "sap-icon://action",
						},
						*/
				 ]
				};

			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(aData);
			
			var oItemTemplate = new sap.m.StandardListItem({
				title: "{title}",
				description: "{description}",
				icon: "{icon}",
				type: "Active"
			})
			
			var oSelectTemplate = new sap.m.StandardListItem({
				title: "{title}",
				description: "{description}",
				icon: "{icon}",
				type: "Active"
			})			
			
			
			/* 1) select dialog with list binding and static parameters */
			var oSelectDialog = new sap.m.SelectDialog("SelectDialog", {
				title: "Select News Papers",
				noDataText: "Sorry, no feeds are available",
			});

			// set model & bind Aggregation
			oSelectDialog.setModel(oModel);
			oSelectDialog.bindAggregation("items", "/feedEntries", oItemTemplate);
			
			// attach close listener
			oSelectDialog.attachConfirm(function (oEvent) {
				var selectedItem = oEvent.getParameter("selectedItem");
				if (selectedItem) {
					oSuggestInput.setValue(selectedItem.getDescription());
					alert("URL:" +selectedItem.getTitle());
					url = selectedItem.getTitle();
					
						showData(url);
					
				}
			});
			
	
			
			var oSuggestInput = new sap.m.Input("suginput", {
				placeholder: "Select News Paper",
				showSuggestion: true,
				showValueHelp: true,
				valueHelpRequest: function(evt) {
					
					// initiate model
					oSelectDialog.setModel(oModel);

					// bind aggregation with filters
					oSelectDialog.bindAggregation("items", {
						path: "/feedEntries",
						template: oSelectTemplate
					});

					// open dialog
					oSelectDialog.open(oSuggestInput.getValue());
					
				}
			});
			oSuggestInput.setModel(oModel);
			oSuggestInput.bindAggregation("suggestionItems", "/feedEntries", new sap.ui.core.Item({text: "{title}"}));

			
			var Bar = new sap.m.Bar({
				contentLeft : [ new sap.m.Button('SlideRight', {
					icon : sap.ui.core.IconPool.getIconURI("menu2"),
					press : function() {
						//oContainer.setSecondaryContentWidth(sap.ui.getCore().byId("tfSidePaneWidth").getValue());

						if (d.system.tablet == true) {
							oContainer.setSecondaryContentWidth("300px");
						}

						if (d.system.phone == true) {
							oContainer.setSecondaryContentWidth("230px");
						}

						if (d.system.desktop == true) {
							oContainer.setSecondaryContentWidth("350px");
						}
						oContainer.setShowSecondaryContent(!oContainer
								.getShowSecondaryContent());
					}
				}) ],
				contentMiddle : [ oSuggestInput

				],
				contentRight : [ new sap.m.Button('settings', {
					icon : sap.ui.core.IconPool.getIconURI("settings"),
					press : function() {

						oPopover.setPlacement(sap.m.PlacementType.Left);
						oPopover.openBy(this);

						//app.to("settingsPage");
					}
				}) ]
			});			
			
			
// Create Tile Container			
		    var oTileContainer = new sap.m.TileContainer('myTile');
			
			function handlePress(oEvent) {
			    window.open(oEvent.oSource.getActiveIcon(), "target=_blank");
				}			
			
			
			function showData(url){
				
				/*if (!oSuggestInput.getValue()) {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.alert("Complete your input first.");
					return;
				}*/
							
							
			    var data = { FeedCollection : [] };
			    
			    var urlFeed = url; 
			    alert("UrlFeed" +urlFeed);
				$.jGFeed(urlFeed,
						  function(feeds){
						    if(!feeds.entries.length){
						      // there was an error
						      jQuery.sap.require("sap.m.MessageToast");
						      sap.m.MessageToast.show("No Data Found!");
						    }
						    
						    else{
						    						    
						    for(var i=0; i<feeds.entries.length; i++){
						      var entry = feeds.entries[i];
	     					      
							    var FeedArray = {};
							 
							    var date = new Date(entry.publishedDate);

							    var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
							    var string = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

							    FeedArray.Number = string;
							  //  FeedArray.Title = entry.title;
							    FeedArray.Title = entry.contentSnippet;
							    FeedArray.Info = entry.author;	
							    FeedArray.ActiveIcon = entry.link;
							    var fName = entry.author.substr(0,entry.author.indexOf(' ')); 
							    var lName = entry.author.substr(entry.author.indexOf(' ')+1); 
							    var fullName = fName.toLowerCase() + "." + lName.toLowerCase(); 
							  /*  var iconUrl = 'http://scn.sap.com/people/' + fullName + '/avatar/46.png';
							    FeedArray.Icon = iconUrl;*/
							    
							 	data.FeedCollection.push( { Feed: FeedArray } );
						    }
						
						    var oModel = new sap.ui.model.json.JSONModel(data);
						   
						    var oTiles = new sap.m.StandardTile({
						        icon : "{Feed/Icon}",            
						        number : "{Feed/Number}",
						        title : "{Feed/Title}",
								info : "{Feed/Info}",
								activeIcon : "{Feed/ActiveIcon}",
								press : handlePress
						    })
						    
						    
						    oTileContainer.bindAggregation("tiles",{
						      path:"/FeedCollection",
						      template:oTiles
						    });
						    oTileContainer.setModel(oModel);
						    
						   alert("Tile Container" +oTileContainer); 
						  page1.addContent(oTileContainer);
						  app.addPage(page1);
						    }
						}, 30); 
				
			}			
			
			
			function resetData(oEvent) {
				oTileContainer.destroyTiles();

			}		
			
			
			
			

//alert("Inside Main.js");

var app = new sap.m.App("myApp123", {
	initialPage : "page1"
});

var oPopover = new sap.m.Popover(
		{
			placement : sap.m.PlacementType.Bottom,
			title : "Settings",
			showHeader : true,
			//		beginButton: oBeginButton,
			//	endButton: oEndButton,
			beforeOpen : function(oEvent) {
				jQuery.sap.log.info("before popover opens!!!");
			},
			afterOpen : function(oEvent) {
				jQuery.sap.log.info("popover is opened finally!!!");
			},
			beforeClose : function(oEvent) {
				jQuery.sap.log.info("before popover closes!!!");
			},
			afterClose : function(oEvent) {
				jQuery.sap.log.info("popover is closed properly!!!");
			},
			//	footer: footer,
			content : [
					//new sap.m.Input("focusInput"), oList2

					// background image switches
					new sap.m.Button(
							{
								text : "Stretched Cheetah",
								press : function() {
									app
											.setBackgroundImage("images/huntingLeopard.jpg");
									app.setBackgroundColor("");
									app.setBackgroundOpacity(1);
									sap.ui.getCore().byId("opacitySlider")
											.setValue(1);
									app.setBackgroundRepeat(false);
									sap.ui.getCore().byId("repeatSelect")
											.setSelectedKey("stretch");
								}
							}),

					new sap.m.Button(
							{
								text : "Repeating translucent Cheetah",
								press : function() {
									app
											.setBackgroundImage("images/huntingLeopard.jpg");
									app.setBackgroundColor("#f00");
									app.setBackgroundOpacity(0.6);
									sap.ui.getCore().byId("opacitySlider")
											.setValue(0.6);
									app.setBackgroundRepeat(true);
									sap.ui.getCore().byId("repeatSelect")
											.setSelectedKey("repeat");
								}
							}),

					new sap.m.Button({
						text : "Clear Background",
						press : function() {
							app.setBackgroundImage("");
							app.setBackgroundColor("");
							app.setBackgroundOpacity(1);
							sap.ui.getCore().byId("opacitySlider").setValue(1);
							app.setBackgroundRepeat(false);
							sap.ui.getCore().byId("repeatSelect")
									.setSelectedKey("stretch");
						}
					}),

					new sap.m.Select("repeatSelect",
							{
								items : [ new sap.ui.core.Item({
									text : "Stretch background",
									key : "stretch"
								}), new sap.ui.core.Item({
									text : "Repeat background",
									key : "tile"
								}) ],
								change : function(oEvent) {
									var selectedItem = oEvent
											.getParameter("selectedItem");
									app.setBackgroundRepeat(selectedItem
											.getKey() === "stretch" ? false
											: true);
								}
							}),

					new sap.m.Slider("opacitySlider", {
						width : "50%",
						min : 0,
						max : 1,
						step : 0.01,
						liveChange : function(oEvent) {
							var value = oEvent.getParameter("value");
							app.setBackgroundOpacity(value);
						}
					}),

			],
			initialFocus : "focusInput"
		});

/*oSelectNewsPaper = new sap.m.Select({
	type : sap.m.SelectType.Default,
	autoAdjustWidth : true,
	items : [ oItemMaalaiMalar = new sap.ui.core.Item({
		key : "0",
		text : "Maalai Malar",
	}),

	oItemDailyThanthi = new sap.ui.core.Item({
		key : "1",
		text : "Daily Thanthi",
	}),

	oItemDinaKaran = new sap.ui.core.Item({
		key : "2",
		text : "Dina Karan",
	}) ]
});*/

var d = sap.ui.Device;

/*var Bar = new sap.m.Bar({
	contentLeft : [ new sap.m.Button('SlideRight', {
		icon : sap.ui.core.IconPool.getIconURI("menu2"),
		press : function() {
			//oContainer.setSecondaryContentWidth(sap.ui.getCore().byId("tfSidePaneWidth").getValue());

			if (d.system.tablet == true) {
				oContainer.setSecondaryContentWidth("300px");
			}

			if (d.system.phone == true) {
				oContainer.setSecondaryContentWidth("230px");
			}

			if (d.system.desktop == true) {
				oContainer.setSecondaryContentWidth("350px");
			}
			oContainer.setShowSecondaryContent(!oContainer
					.getShowSecondaryContent());
		}
	}) ],
	contentMiddle : [ oSelectNewsPaper

	],
	contentRight : [ new sap.m.Button('settings', {
		icon : sap.ui.core.IconPool.getIconURI("settings"),
		press : function() {

			oPopover.setPlacement(sap.m.PlacementType.Left);
			oPopover.openBy(this);

			//app.to("settingsPage");
		}
	}) ]
});*/

var slideRightButton = sap.ui.getCore().byId("SlideRight");
slideRightButton.addStyleClass("SlideRightButtonStyle");

var page1 = new sap.m.Page("page1", {
	title : "Page 1",
	content : [
       
	]

});

//page1.addContent(oSelectDialog);
//page1.addContent(oTileContainer);
page1.setCustomHeader(Bar);

var page2 = new sap.m.Page("page2", {
	title : "Page 2",
	showNavButton : true,
	navButtonText : "Page 1",
	navButtonPress : function() {
		app.back();
	},
	content : [ new sap.m.Button({
		text : "Back to Page 1",
		press : function() {
			app.back();
		}
	}) ]
});
app.addPage(page1).addPage(page2);

var oContainer = new sap.ui.unified.SplitContainer({
	content : [ app ],
	secondaryContent : [ new sap.ui.commons.Button({
		text : "Content",
		width : "100%",
		height : "100%",
		lite : true
	}), ]
});

oContainer.placeAt("content");
