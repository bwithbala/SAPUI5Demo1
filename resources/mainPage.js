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

oSelectNewsPaper = new sap.m.Select({
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
});

var d = sap.ui.Device;

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
});

var slideRightButton = sap.ui.getCore().byId("SlideRight");
slideRightButton.addStyleClass("SlideRightButtonStyle");

var page1 = new sap.m.Page("page1", {
	title : "Page 1",
	content : [

	]

});

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
