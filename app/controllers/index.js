var xGrid = 2;
var yGrid = 0;
var cellWidth = 0;
var cellHeight = 0;
var ySpacer = 0;
var listaPueblos ={
  "data": [
    {
      "id": "ÁVILA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "NARRILLOS DE SAN LEONARDO",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "CARDEÑOSA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "PEÑALBA DE ÁVILA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "GOTARRENDURA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
      "id": "ÁVILA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "NARRILLOS DE SAN LEONARDO",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "CARDEÑOSA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "PEÑALBA DE ÁVILA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    },
    {
    	"id": "GOTARRENDURA",
        "descripcion": "descripcion",
        "GPS": {"lat":"37.78583526611328",
        		"lon":"-122.4064178466797"}
    }
  ]
};
//JSON.stringify
//JSON.parse
var pueblos = listaPueblos;
//Ti.API.warn(pueblos.data.length);
yGrid = pueblos.data.length / xGrid;
if (OS_ANDROID) {
	cellWidth = Math.round(Titanium.Platform.displayCaps.platformWidth / 1.35 / Ti.Platform.displayCaps.logicalDensityFactor / xGrid);
	cellHeight = cellWidth;
	ratio = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.dpi;
	ancho = Titanium.Platform.displayCaps.platformWidth;
	espacio = ((Titanium.Platform.displayCaps.platformWidth - (xGrid * cellWidth) * Ti.Platform.displayCaps.logicalDensityFactor) / (xGrid + 1)) / Ti.Platform.displayCaps.logicalDensityFactor;
	var xSpacer = Math.round(espacio);
	ySpacer = xSpacer / 2;
	Ti.API.info("xSpacer:" + xSpacer + " ySpacer:" + ySpacer + " Ancho:" + ancho + " Ratio:" + ratio + " cellWidth:" + cellWidth + " cellHeight:" + cellHeight);

} else {
	cellWidth = Math.round(Titanium.Platform.displayCaps.platformWidth / 1.35 / xGrid);
	cellHeight = cellWidth;
	espacio = ((Titanium.Platform.displayCaps.platformWidth - (xGrid * cellWidth)) / (xGrid + 1));
	var xSpacer = Math.round(espacio);
	ySpacer = xSpacer / 2;
	Ti.API.info("xSpacer:" + xSpacer + " ySpacer:" + ySpacer + " Ancho:" + Titanium.Platform.displayCaps.platformWidth + " Ratio:" + Ti.Platform.displayCaps.logicalDensityFactor + " cellWidth:" + cellWidth + " cellHeight:" + cellHeight);

}

var tableData = [];

var colorSet = ["#D44646", "#46D463", "#46D4BE", "#C2D446", "#D446D5", "#4575D5", "#E39127", "#879181", "#E291D4"];

var colorSetIndex = 0;
var cellIndex = 0;
var puebloIndex = 0;
//

for (var y = 0; y < yGrid; y++) {
	var thisRow = Ti.UI.createTableViewRow({
		className : "grid",
		layout : "horizontal",
		height : cellHeight + (2 * ySpacer),
		selectedBackgroundColor : "Transparent",
		backgroundSelectedColor : "Transparent",
		backgroundColor : "Transparent",
		touchEnabled : true
	});
	thisRow.setTouchEnabled(true);
	for (var x = 0; x < xGrid; x++) {
		var thisView = Ti.UI.createView({
			objName : "grid-view",
			objIndex : puebloIndex.toString(),
			objNombre : pueblos.data[puebloIndex].id,
			objDescripcion : pueblos.data[puebloIndex].descripcion,
			objGPSlat : pueblos.data[puebloIndex].GPS.lat,
			objGPSlon : pueblos.data[puebloIndex].GPS.lon,
			backgroundColor : colorSet[colorSetIndex],
			selectedBackgroundColor : colorSet[colorSetIndex],
			backgroundSelectedColor : colorSet[colorSetIndex],
			left : xSpacer,
			height : cellHeight,
			width : cellWidth,
			top: ySpacer
		});
	
		if (puebloIndex < pueblos.data.length) {
			var thisLabel = Ti.UI.createLabel({
				color : "white",
				font : {
					fontWeight : 'bold'
				},
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : pueblos.data[puebloIndex].id,
				touchEnabled : false
			});
			thisView.add(thisLabel);
			thisRow.add(thisView);
		}
		cellIndex++;
		colorSetIndex++;
		puebloIndex++;

		if (colorSetIndex === colorSet.length) {
			colorSetIndex = 0;
		}
	}
	tableData.push(thisRow);
}
var tableview = Ti.UI.createTableView({
	data : tableData,
	separatorColor : 'transparent',
	backgroundColor : 'white',
	touchEnabled : true,
	bubbleParent : false,
	top: 4
});

if (OS_IOS) {
	tableview.setSeparatorStyle(0);
}

tableview.addEventListener("click", function(e) {
	if (e.source.objName) {
		Ti.API.info("---> "+e.source.objNombre+" " + e.source.objName + e.source.objIndex + " was clicked!");
	}
	controllerPueblo = Alloy.createController('pueblo',{
    name: e.source.objNombre,
    color: e.source.backgroundColor,
    descripcion: e.source.objDescripcion,
    gpsLat: e.source.objGPSlat,
    gpsLon: e.source.objGPSlon,
    token: '',
    tokenValue: ''
});
	var winPueblo = controllerPueblo.getView();
	// controllerPueblo.setTitulo(e.source.objNombre);
	 winPueblo.open();
});

var win = Ti.UI.createWindow({
	backgroundColor : "white",
	title : "Main Window"
});
$.ventanaPrincipal.add(tableview);
$.ventanaPrincipal.open();