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
        var dataDB = {
            data: []
        };
        var db = Ti.Database.open("BD");
        var pueblosRS = db.execute("SELECT * FROM pueblos");
        while (pueblosRS.isValidRow()) {
            var id = pueblosRS.fieldByName("id");
            var nombre = pueblosRS.fieldByName("nombre");
            var descripcion = pueblosRS.fieldByName("descripcion");
            var latitud = pueblosRS.fieldByName("latitud");
            var longitud = pueblosRS.fieldByName("longitud");
            var imagen = pueblosRS.fieldByName("imagen");
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
                longitudchek: longitudchek,
                imagen: imagen
            });
            pueblosRS.next();
        }
        db.close();
        pueblos = dataDB;
        Ti.API.info("DATOSDB: " + JSON.stringify(pueblos));
        callback();
    }
    function pintarTabla() {
        var tableData = [];
        var colorSetIndex = 0;
        var cellIndex = 0;
        var puebloIndex = 0;
        yGrid = pueblos.data.length / xGrid;
        var xSpacer;
        cellWidth = Math.round(Titanium.Platform.displayCaps.platformWidth / 1.05 / xGrid);
        cellHeight = cellWidth;
        espacio = (Titanium.Platform.displayCaps.platformWidth - xGrid * cellWidth) / (xGrid + 1);
        var xSpacer = Math.round(espacio);
        ySpacer = xSpacer / 2;
        Ti.API.info("xSpacer:" + xSpacer + " ySpacer:" + ySpacer + " Ancho:" + Titanium.Platform.displayCaps.platformWidth + " Ratio:" + Ti.Platform.displayCaps.logicalDensityFactor + " cellWidth:" + cellWidth + " cellHeight:" + cellHeight);
        for (var y = 0; yGrid > y; y++) {
            var thisRow = Ti.UI.createTableViewRow({
                className: "grid",
                layout: "horizontal",
                height: cellHeight + 2 * ySpacer,
                backgroundSelectedColor: "Transparent",
                backgroundColor: "Transparent",
                bubbleParent: false,
                touchEnabled: false
            });
            thisRow.setSelectionStyle(Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE);
            thisRow.setSelectedBackgroundColor("Transparent");
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
                        objIndex: pueblos.data[puebloIndex].id,
                        objNombre: pueblos.data[puebloIndex].nombre,
                        objDescripcion: pueblos.data[puebloIndex].descripcion,
                        objGPSlat: pueblos.data[puebloIndex].GPS.lat,
                        objGPSlon: pueblos.data[puebloIndex].GPS.lon,
                        objImagen: pueblos.data[puebloIndex].imagen,
                        objHora: pueblos.data[puebloIndex].hora,
                        objDia: pueblos.data[puebloIndex].dia,
                        objLatitudchek: pueblos.data[puebloIndex].latitudchek,
                        objLongitudchek: pueblos.data[puebloIndex].longitudchek,
                        backgroundColor: colorSet[colorSetIndex],
                        backgroundSelectedColor: colorSet[colorSetIndex],
                        left: 0,
                        height: cellHeight - 2,
                        width: cellWidth - 2,
                        top: 2,
                        touchEnabled: true
                    });
                    var thisViewShadow = Ti.UI.createView({
                        objName: "shadow-grid-view",
                        backgroundGradient: {
                            type: "linear",
                            startPoint: {
                                x: "80%",
                                y: "20%"
                            },
                            endPoint: {
                                x: "100%",
                                y: "0%"
                            },
                            colors: [ {
                                color: "#00ffffff",
                                offset: 0
                            }, {
                                color: "#ff000000",
                                offset: 0
                            }, {
                                color: "#33000000",
                                offset: 1
                            } ]
                        },
                        top: 0,
                        left: 0,
                        height: cellHeight,
                        width: cellWidth,
                        touchEnabled: false,
                        zIndex: "1"
                    });
                    var image = Ti.UI.createImageView({
                        right: 0,
                        top: 0,
                        height: "25%",
                        width: "25%",
                        image: "green-check.png",
                        touchEnabled: false
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
                                id: e.source.objIndex,
                                name: e.source.objNombre,
                                color: e.source.backgroundColor,
                                descripcion: e.source.objDescripcion,
                                gpsLat: e.source.objGPSlat,
                                gpsLon: e.source.objGPSlon,
                                parentWindow: Ti.UI.currentWindow,
                                imagen: e.source.objImagen,
                                hora: e.source.objHora,
                                dia: e.source.objDia,
                                latitudchek: e.source.objLatitudchek,
                                longitudchek: e.source.objLongitudchek
                            });
                            var winPueblo = controllerPueblo.getView();
                            winPueblo.open();
                        });
                        if (null != pueblos.data[puebloIndex].dia) {
                            thisViewShadow.add(image);
                            thisViewContenedor.add(thisViewShadow);
                        }
                        thisViewContenedor.add(thisView);
                        thisRow.add(thisViewContenedor);
                    }
                }
                cellIndex++;
                colorSetIndex++;
                puebloIndex++;
                colorSetIndex === colorSet.length && (colorSetIndex = 0);
            }
            tableData.push(thisRow);
        }
        $.tableview.setData(tableData);
        $.tableview.setSeparatorStyle(0);
    }
    function refrescar() {
        asignarJson(function() {
            js = [];
            $.tableview.setData(js);
            pintarTabla();
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "listaPueblos";
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
    $.__views.ventanaPrincipal = Ti.UI.createView({
        fullscreen: true,
        navBarHidden: true,
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        backgroundImage: "/images/default.png",
        id: "ventanaPrincipal"
    });
    $.__views.ventanaPrincipal && $.addTopLevelView($.__views.ventanaPrincipal);
    $.__views.tableview = Ti.UI.createTableView({
        separatorColor: "transparent",
        backgroundColor: "transparent",
        selectedBackgroundColor: "Transparent",
        backgroundSelectedColor: "Transparent",
        touchEnabled: true,
        bubbleParent: false,
        top: 4,
        id: "tableview"
    });
    $.__views.ventanaPrincipal.add($.__views.tableview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var xGrid = 2;
    var yGrid = 0;
    var cellWidth = 0;
    var cellHeight = 0;
    var ySpacer = 0;
    var colorSet = [ "#FF0000", "#00FF33", "#00FFDA", "#DEFF00", "#FF00FF", "#0055FF", "#FF9100", "#838383", "#FF9AEF" ];
    var pueblos = {};
    asignarJson(function() {
        pintarTabla();
    });
    Ti.App.addEventListener("app:updateTables", function() {
        Ti.API.info("Se hace clic sobre la fila");
        refrescar();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;