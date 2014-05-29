
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
			
			
			/* 1) select dialog with list binding and static parameters */
			var oSelectDialog = new sap.m.SelectDialog("SelectDialog", {
				title: "Choose SCN Feed for which you want to See Data",
				noDataText: "Sorry, no feeds are available",
			});

			// set model & bind Aggregation
			oSelectDialog.setModel(oModel);
			oSelectDialog.bindAggregation("items", "/feedEntries", oItemTemplate);
			
			// attach close listener
			oSelectDialog.attachConfirm(function (oEvent) {
				var selectedItem = oEvent.getParameter("selectedItem");
				if (selectedItem) {
					oSuggestInput.setValue(selectedItem.getTitle());
				}
			});
			
	
			
			var oSuggestInput = new sap.m.Input("suginput", {
				placeholder: "Select SCN Feed",
				showSuggestion: true,
				showValueHelp: true,
				valueHelpRequest: function(evt) {
					
					// initiate model
					oSelectDialog.setModel(oModel);

					// bind aggregation with filters
					oSelectDialog.bindAggregation("items", {
						path: "/feedEntries",
						template: oItemTemplate
					});

					// open dialog
					oSelectDialog.open(oSuggestInput.getValue());
					
				}
			});
			oSuggestInput.setModel(oModel);
			oSuggestInput.bindAggregation("suggestionItems", "/feedEntries", new sap.ui.core.Item({text: "{title}"}));
			
       	  jQuery.sap.require("sap.ui.core.IconPool");
			
       	  
     			var oShell= new sap.m.Shell("myShell", {
			title: "My Application",
			//logo: "images/SAPUI5.png",
			headerRightText: "Ballz Test",
			//logout: function() {alert("Logout button was pressed");}
		});
		
   	  
       	  
/*		    var app = new sap.m.App();
			var page = new sap.m.Page({});
		    page.setEnableScrolling(false);
		    app.setInitialPage(page.getId());
			page.setShowHeader(true);*/
			
            var oButtonDisplay = new sap.m.Button("display", {
				type: sap.m.ButtonType.Default,
				text: "Display",
				icon: sap.ui.core.IconPool.getIconURI("display"),
				enabled: true,
				press : showData
			});
		    
		    
		    var oButtonReset = new sap.m.Button("refresh", {
				type: sap.m.ButtonType.Default,
				text: "Refresh",
				icon: sap.ui.core.IconPool.getIconURI("refresh"),
				enabled: true,
				press : resetData
			});
		    
		    
		//	app.addPage(page);
	/*		page.setTitle('SCN Feed'); 
			page.addContent(oSuggestInput);
			page.addContent(oButtonDisplay);
			page.addContent(oButtonReset);*/
		   
		//    app.placeAt('content');			
		    
		    var oTileContainer = new sap.m.TileContainer('myTile');
	
			function handlePress(oEvent) {
			    window.open(oEvent.oSource.getActiveIcon(), "_blank");
				}
	
			function showData(oEvent){
				
				if (!oSuggestInput.getValue()) {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.alert("Complete your input first.");
					return;
				}
							
							
			    var data = { FeedCollection : [] };
			    
			    var urlFeed = oSuggestInput.getValue(); 
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
							    FeedArray.Title = entry.title;
							    FeedArray.Info = entry.author;	
							    FeedArray.ActiveIcon = entry.link;
							    var fName = entry.author.substr(0,entry.author.indexOf(' ')); 
							    var lName = entry.author.substr(entry.author.indexOf(' ')+1); 
							    var fullName = fName.toLowerCase() + "." + lName.toLowerCase(); 
							    var iconUrl = 'http://scn.sap.com/people/' + fullName + '/avatar/46.png';
							    FeedArray.Icon = iconUrl;
							    
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
						    
					
						    
						    detailPage.addContent(oTileContainer);
						    
						    }
						}, 30); 
				
			}
  			
			function resetData(oEvent) {
				
				oTileContainer.destroyTiles();
				oSuggestInput.setValue();
				
			}
			
			
			var masterPage = new sap.m.Page({});
			masterPage.setEnableScrolling(false);
			masterPage.setShowHeader(true);			

			var detailPage = new sap.m.Page({});
			detailPage.setEnableScrolling(false);
			detailPage.setShowHeader(true);					
			
			
			masterPage.setTitle('Select Catagory'); 
	
			detailPage.setTitle('Selected News'); 
			detailPage.addContent(oSuggestInput);
			detailPage.addContent(oButtonDisplay);
			detailPage.addContent(oButtonReset);			
			
			var oApp = new sap.m.SplitApp("myApp", {
				masterPages: masterPage
				detailPages: detailPage	
					
			});
			
			oShell.setApp(oApp);
			oShell.placeAt("content");   			
