function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function asignarJson(callback) {
        var db = Ti.Database.open("BD");
        var pueblosRS = db.execute("SELECT * FROM pueblos");
        while (pueblosRS.isValidRow()) {
            var id = pueblosRS.fieldByName("id");
            var nombre = pueblosRS.fieldByName("nombre");
            var descripcion = pueblosRS.fieldByName("descripcion");
            var latitud = pueblosRS.fieldByName("latitud");
            var longitud = pueblosRS.fieldByName("longitud");
            var dia = pueblosRS.fieldByName("dia");
            var hora = pueblosRS.fieldByName("hora");
            var latitudchek = pueblosRS.fieldByName("latitudchek");
            var longitudchek = pueblosRS.fieldByName("longitudchek");
            dataDB.data = dataDB.data.concat({
                id: id,
                nombre: nombre,
                descripcion: descripcion,
                GPS: {
                    lat: latitud,
                    lon: longitud
                },
                dia: dia,
                hora: hora,
                latitudchek: latitudchek,
                longitudchek: longitudchek
            });
            pueblosRS.next();
        }
        db.close();
        pueblos = dataDB;
        Ti.API.info("DATOSDB: " + JSON.stringify(pueblos));
        callback();
    }
    function pintarTabla() {
        yGrid = pueblos.data.length / xGrid;
        var xSpacer;
        cellWidth = Math.round(Titanium.Platform.displayCaps.platformWidth / 1.05 / Ti.Platform.displayCaps.logicalDensityFactor / xGrid);
        cellHeight = cellWidth;
        ratio = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.dpi;
        ancho = Titanium.Platform.displayCaps.platformWidth;
        espacio = (Titanium.Platform.displayCaps.platformWidth - xGrid * cellWidth * Ti.Platform.displayCaps.logicalDensityFactor) / (xGrid + 1) / Ti.Platform.displayCaps.logicalDensityFactor;
        var xSpacer = Math.round(espacio);
        ySpacer = xSpacer / 2;
        Ti.API.info("xSpacer:" + xSpacer + " ySpacer:" + ySpacer + " Ancho:" + ancho + " Ratio:" + ratio + " cellWidth:" + cellWidth + " cellHeight:" + cellHeight);
        for (var y = 0; yGrid > y; y++) {
            var thisRow = Ti.UI.createTableViewRow({
                className: "grid",
                layout: "horizontal",
                height: cellHeight + 2 * ySpacer,
                selectedBackgroundColor: "Transparent",
                backgroundSelectedColor: "Transparent",
                backgroundColor: "Transparent",
                selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                bubbleParent: false,
                touchEnabled: false
            });
            for (var x = 0; xGrid > x; x++) {
                if (puebloIndex < pueblos.data.length) {
                    var thisViewContenedor = Ti.UI.createView({
                        objName: "contenedor-grid-view",
                        backgroundColor: "Transparent",
                        left: xSpacer,
                        height: cellHeight,
                        width: cellWidth,
                        top: ySpacer
                    });
                    var thisView = Ti.UI.createView({
                        objName: "grid-view",
                        objIndex: puebloIndex.toString(),
                        objNombre: pueblos.data[puebloIndex].nombre,
                        objDescripcion: pueblos.data[puebloIndex].descripcion,
                        objGPSlat: pueblos.data[puebloIndex].GPS.lat,
                        objGPSlon: pueblos.data[puebloIndex].GPS.lon,
                        backgroundColor: colorSet[colorSetIndex],
                        selectedBackgroundColor: colorSet[colorSetIndex],
                        backgroundSelectedColor: colorSet[colorSetIndex],
                        left: xSpacer,
                        height: cellHeight,
                        width: cellWidth,
                        top: ySpacer,
                        touchEnabled: true
                    });
                    var thisViewShadow = Ti.UI.createView({
                        objName: "shadow-grid-view",
                        backgroundGradient: {
                            type: "linear",
                            startPoint: {
                                x: "100%",
                                y: "100%"
                            },
                            endPoint: {
                                x: "100%",
                                y: "93%"
                            },
                            colors: [ {
                                color: "Transparent",
                                offset: 0
                            }, {
                                color: "#33000000",
                                offset: 1
                            } ]
                        },
                        top: 3,
                        left: 0,
                        height: cellHeight - 3,
                        width: cellWidth,
                        touchEnabled: true,
                        zIndex: "-1",
                        borderRadius: 5
                    });
                    if (puebloIndex < pueblos.data.length) {
                        var thisLabel = Ti.UI.createLabel({
                            color: "white",
                            font: {
                                fontWeight: "bold"
                            },
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            text: pueblos.data[puebloIndex].nombre,
                            touchEnabled: false
                        });
                        thisView.add(thisLabel);
                        thisView.addEventListener("click", function(e) {
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
                        thisViewContenedor.add(thisView);
                        thisViewContenedor.add(thisViewShadow);
                        thisRow.add(thisView);
                    }
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
            backgroundColor: "transparent",
            selectedBackgroundColor: "Transparent",
            backgroundSelectedColor: "Transparent",
            touchEnabled: true,
            bubbleParent: false,
            top: 4
        });
        tableview.addEventListener("click", function() {
            Ti.API.info("Se hace clic sobre la fila");
        });
        Ti.UI.createWindow({
            backgroundColor: "white",
            title: "Main Window"
        });
        $.ventanaPrincipal.add(tableview);
        $.ventanaPrincipal.open();
    }
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
        backgroundImage: "/images/default.png",
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
    var tableData = [];
    var colorSet = [ "#D44646", "#46D463", "#46D4BE", "#C2D446", "#D446D5", "#4575D5", "#E39127", "#879181", "#E291D4" ];
    var colorSetIndex = 0;
    var cellIndex = 0;
    var puebloIndex = 0;
    var pueblos = {};
    var dataDB = {
        data: []
    };
    asignarJson(function() {
        pintarTabla();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;