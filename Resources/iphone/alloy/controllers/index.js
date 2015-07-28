function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.ventanaPrincipal = Ti.UI.createWindow({
        fullscreen: true,
        navBarHidden: true,
        backgroundColor: "white",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "ventanaPrincipal"
    });
    $.__views.ventanaPrincipal && $.addTopLevelView($.__views.ventanaPrincipal);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var xGrid = 2;
    var yGrid = 0;
    var cellWidth = 0;
    var cellHeight = 0;
    var ySpacer = 0;
    var listaPueblos = {
        data: [ {
            id: "ÁVILA",
            descripcion: "descripcion",
            GPS: {
                lat: "40.6552873",
                lon: "-4.7028309"
            }
        }, {
            id: "NARRILLOS DE SAN LEONARDO",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "CARDEÑOSA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "PEÑALBA DE ÁVILA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "GOTARRENDURA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "ÁVILA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "NARRILLOS DE SAN LEONARDO",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "CARDEÑOSA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "PEÑALBA DE ÁVILA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        }, {
            id: "GOTARRENDURA",
            descripcion: "descripcion",
            GPS: {
                lat: "37.78583526611328",
                lon: "-122.4064178466797"
            }
        } ]
    };
    var pueblos = listaPueblos;
    yGrid = pueblos.data.length / xGrid;
    var xSpacer;
    cellWidth = Math.round(Titanium.Platform.displayCaps.platformWidth / 1.35 / xGrid);
    cellHeight = cellWidth;
    espacio = (Titanium.Platform.displayCaps.platformWidth - xGrid * cellWidth) / (xGrid + 1);
    var xSpacer = Math.round(espacio);
    ySpacer = xSpacer / 2;
    Ti.API.info("xSpacer:" + xSpacer + " ySpacer:" + ySpacer + " Ancho:" + Titanium.Platform.displayCaps.platformWidth + " Ratio:" + Ti.Platform.displayCaps.logicalDensityFactor + " cellWidth:" + cellWidth + " cellHeight:" + cellHeight);
    var tableData = [];
    var colorSet = [ "#D44646", "#46D463", "#46D4BE", "#C2D446", "#D446D5", "#4575D5", "#E39127", "#879181", "#E291D4" ];
    var colorSetIndex = 0;
    var cellIndex = 0;
    var puebloIndex = 0;
    for (var y = 0; yGrid > y; y++) {
        var thisRow = Ti.UI.createTableViewRow({
            className: "grid",
            layout: "horizontal",
            height: cellHeight + 2 * ySpacer,
            selectedBackgroundColor: "Transparent",
            backgroundSelectedColor: "Transparent",
            backgroundColor: "Transparent",
            touchEnabled: true
        });
        thisRow.setTouchEnabled(true);
        for (var x = 0; xGrid > x; x++) {
            var thisView = Ti.UI.createView({
                objName: "grid-view",
                objIndex: puebloIndex.toString(),
                objNombre: pueblos.data[puebloIndex].id,
                objDescripcion: pueblos.data[puebloIndex].descripcion,
                objGPSlat: pueblos.data[puebloIndex].GPS.lat,
                objGPSlon: pueblos.data[puebloIndex].GPS.lon,
                backgroundColor: colorSet[colorSetIndex],
                selectedBackgroundColor: colorSet[colorSetIndex],
                backgroundSelectedColor: colorSet[colorSetIndex],
                left: xSpacer,
                height: cellHeight,
                width: cellWidth,
                top: ySpacer
            });
            if (puebloIndex < pueblos.data.length) {
                var thisLabel = Ti.UI.createLabel({
                    color: "white",
                    font: {
                        fontWeight: "bold"
                    },
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    text: pueblos.data[puebloIndex].id,
                    touchEnabled: false
                });
                thisView.add(thisLabel);
                thisRow.add(thisView);
            }
            cellIndex++;
            colorSetIndex++;
            puebloIndex++;
            colorSetIndex === colorSet.length && (colorSetIndex = 0);
        }
        tableData.push(thisRow);
    }
    var tableview = Ti.UI.createTableView({
        data: tableData,
        separatorColor: "transparent",
        backgroundColor: "white",
        touchEnabled: true,
        bubbleParent: false,
        top: 4
    });
    tableview.setSeparatorStyle(0);
    tableview.addEventListener("click", function(e) {
        e.source.objName && Ti.API.info("---> " + e.source.objNombre + " " + e.source.objName + e.source.objIndex + " was clicked!");
        controllerPueblo = Alloy.createController("pueblo", {
            name: e.source.objNombre,
            color: e.source.backgroundColor,
            descripcion: e.source.objDescripcion,
            gpsLat: e.source.objGPSlat,
            gpsLon: e.source.objGPSlon,
            token: "",
            tokenValue: ""
        });
        var winPueblo = controllerPueblo.getView();
        winPueblo.open();
    });
    Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Main Window"
    });
    $.ventanaPrincipal.add(tableview);
    $.ventanaPrincipal.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;