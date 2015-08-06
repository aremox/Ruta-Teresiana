function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cerrar() {
        var actividad = $.winPueblo.getActivity();
        actividad.finish();
    }
    function localizar() {
        if (false === Titanium.Geolocation.locationServicesEnabled) {
            Ti.API.error("error :gps no activado");
            alert("error :gps no activado");
        } else location.start({
            action: function(responseLocation) {
                Ti.API.info(responseLocation.latitude + " " + responseLocation.longitude);
                location.stop();
                compararGPS(responseLocation.latitude, responseLocation.longitude, chequearTeresiana);
            },
            error: function(e) {
                Ti.API.error(e);
                alert("Fallo obteniendo localización");
            }
        });
    }
    function compararGPS(latitude, longitude, callbak) {
        distancis = location.distancia(data.gpsLat, data.gpsLon, latitude, longitude);
        if (distancis >= .3) {
            Ti.API.info("menor de 300 metros: " + distancis);
            Ti.API.info(data.gpsLat + " " + data.gpsLon + " " + latitude + " " + longitude);
            callbak(latitude, longitude);
        } else Ti.API.info("mas de 300 metros: " + distancis);
    }
    function chequearTeresiana() {
        var db = Ti.Database.open("BD");
        var fecha = new Date(Date.now());
        var d = getFormattedDate(fecha);
        var h = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        Ti.API.info("Id: " + data.id + " dia: " + d + " hora: " + h);
        db.execute("UPDATE pueblos SET dia=?,hora=? WHERE id=?", d, h, data.id);
        db.close();
        Ti.App.fireEvent("app:updateTables");
    }
    function getFormattedDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;
        return year + month + day;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pueblo";
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
    var __defers = {};
    $.__views.winPueblo = Ti.UI.createWindow({
        fullscreen: true,
        navBarHidden: true,
        id: "winPueblo"
    });
    $.__views.winPueblo && $.addTopLevelView($.__views.winPueblo);
    $.__views.puebloContenedor = Ti.UI.createView({
        fullscreen: true,
        navBarHidden: true,
        layout: "vertical",
        id: "puebloContenedor"
    });
    $.__views.winPueblo.add($.__views.puebloContenedor);
    $.__views.actionBar = Ti.UI.createView({
        height: "44dp",
        color: "white",
        layout: "default",
        textAlign: "center",
        top: 0,
        backgroundColor: "transparent",
        id: "actionBar"
    });
    $.__views.puebloContenedor.add($.__views.actionBar);
    $.__views.botonMenu = Ti.UI.createImageView({
        image: "/material/ic_chevron_left_white_48dp.png",
        width: "40dp",
        left: "6dp",
        backgroundColor: "transparent",
        id: "botonMenu"
    });
    $.__views.actionBar.add($.__views.botonMenu);
    cerrar ? $.__views.botonMenu.addEventListener("click", cerrar) : __defers["$.__views.botonMenu!click!cerrar"] = true;
    $.__views.textoMenu = Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Arial",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        shadowColor: "#66333333",
        shadowRadius: 3,
        shadowOffset: {
            x: 2,
            y: 2
        },
        textAlign: "center",
        left: "55dp",
        right: "55dp",
        id: "textoMenu"
    });
    $.__views.actionBar.add($.__views.textoMenu);
    $.__views.botonFavorito = Ti.UI.createImageView({
        id: "botonFavorito"
    });
    $.__views.actionBar.add($.__views.botonFavorito);
    $.__views.botonRecargar = Ti.UI.createImageView({
        id: "botonRecargar"
    });
    $.__views.actionBar.add($.__views.botonRecargar);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "1dp",
        backgroundColor: "#33000000",
        id: "__alloyId0"
    });
    $.__views.puebloContenedor.add($.__views.__alloyId0);
    $.__views.imagenPueblo = Ti.UI.createLabel({
        backgroundColor: "white",
        color: "white",
        height: "30%",
        width: "100%",
        id: "imagenPueblo"
    });
    $.__views.puebloContenedor.add($.__views.imagenPueblo);
    $.__views.actionBotones = Ti.UI.createView({
        height: "44dp",
        color: "white",
        layout: "horizontal",
        textAlign: "center",
        id: "actionBotones"
    });
    $.__views.puebloContenedor.add($.__views.actionBotones);
    $.__views.__alloyId1 = Ti.UI.createView({
        textAlign: "center",
        width: "50%",
        id: "__alloyId1"
    });
    $.__views.actionBotones.add($.__views.__alloyId1);
    $.__views.chequearPueblo = Ti.UI.createImageView({
        image: "/material/ic_radio_button_off_white_48dp.png",
        height: "44dp",
        id: "chequearPueblo"
    });
    $.__views.__alloyId1.add($.__views.chequearPueblo);
    localizar ? $.__views.chequearPueblo.addEventListener("click", localizar) : __defers["$.__views.chequearPueblo!click!localizar"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        textAlign: "center",
        width: "50%",
        id: "__alloyId2"
    });
    $.__views.actionBotones.add($.__views.__alloyId2);
    $.__views.compartirPueblo = Ti.UI.createImageView({
        image: "/material/ic_share_white_48dp.png",
        height: "44dp",
        id: "compartirPueblo"
    });
    $.__views.__alloyId2.add($.__views.compartirPueblo);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: "1dp",
        backgroundColor: "#33000000",
        id: "__alloyId3"
    });
    $.__views.puebloContenedor.add($.__views.__alloyId3);
    $.__views.vtextoPueblo = Ti.UI.createScrollView({
        backgroundColor: "white",
        width: "100%",
        color: "black",
        zIndex: "-1",
        id: "vtextoPueblo",
        showVerticalScrollIndicator: "true"
    });
    $.__views.puebloContenedor.add($.__views.vtextoPueblo);
    $.__views.textoPueblo = Ti.UI.createLabel({
        color: "#232323",
        left: "12dp",
        right: "12dp",
        font: {
            fontSize: "19dp",
            fontFamily: "Arial"
        },
        id: "textoPueblo"
    });
    $.__views.vtextoPueblo.add($.__views.textoPueblo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var location = require("location");
    var args = arguments[0] || {};
    var data = [];
    data = args;
    $.textoMenu.setText(data.name);
    $.puebloContenedor.setBackgroundColor(data.color);
    $.textoPueblo.setText(data.id + " " + data.descripcion + " " + data.gpsLat + " " + data.gpsLon);
    Titanium.API.info("data Value::" + data.descripcion + " " + data.gpsLat + " " + data.gpsLon);
    $.imagenPueblo.setText("foto");
    __defers["$.__views.botonMenu!click!cerrar"] && $.__views.botonMenu.addEventListener("click", cerrar);
    __defers["$.__views.chequearPueblo!click!localizar"] && $.__views.chequearPueblo.addEventListener("click", localizar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;