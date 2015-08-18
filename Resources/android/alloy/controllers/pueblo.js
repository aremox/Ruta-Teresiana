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
            $.chequearPueblo.setImage("/material/ic_radio_button_on_white_48dp.png");
            callbak(latitude, longitude);
        } else Ti.API.info("mas de 300 metros: " + distancis);
    }
    function chequearTeresiana(latitude, longitude) {
        var db = Ti.Database.open("BD");
        var fecha = new Date(Date.now());
        var d = getFormattedDate(fecha);
        var h = getFormattedHora(fecha);
        Ti.API.info("Id: " + data.id + " dia: " + d + " hora: " + h);
        db.execute("UPDATE pueblos SET dia=?,hora=?,latitudchek=?,longitudchek=? WHERE id=?", d, h, latitude, longitude, data.id);
        db.close();
        sello(d, h, latitude, longitude);
        Ti.App.fireEvent("app:updateTables");
    }
    function sello(dia, hora, latitudchek, longitudchek) {
        Titanium.API.info("data Value::" + dia + " " + hora + " " + latitudchek + " " + longitudchek);
        if (null != dia && null != hora && null != latitudchek && null != longitudchek) {
            $.chequearPueblo.setImage("/material/ic_radio_button_on_white_48dp.png");
            $.diaCheck.setText(dia);
            $.horaCheck.setText(hora);
            $.imagenPuebloCheck.setImage("/caminosteresianos_transparente.png");
        }
    }
    function getFormattedDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;
        return day + "-" + month + "-" + year;
    }
    function getFormattedHora(date) {
        var hora = (1 + date.getHours()).toString();
        hora = hora.length > 1 ? hora : "0" + hora;
        var min = (1 + date.getMinutes()).toString();
        min = min.length > 1 ? min : "0" + min;
        var seg = (1 + date.getSeconds()).toString();
        seg = seg.length > 1 ? seg : "0" + seg;
        return hora + ":" + min + ":" + seg;
    }
    function swipe(e) {
        $.textoPueblo.setText("direccion: " + e.direction + " " + newTopViewImagenPueblo);
        direccion = e.direction;
        if ("up" == direccion) {
            $.vtextoPueblo.setHeight(Titanium.Platform.displayCaps.platformHeight - 44);
            var newTopvtextoPueblo = -1 * $.vtextoPueblo.rect.y + 44;
            $.vtextoPueblo.animate({
                top: newTopvtextoPueblo,
                zIndex: 0,
                duration: 500
            }, function() {
                $.vtextoPueblo.setTop(newTopvtextoPueblo);
                $.vtextoPueblo.setZIndex(4);
            });
            $.ViewImagenPueblo.animate({
                opacity: 0,
                duration: 500
            }, function() {
                $.ViewImagenPueblo.setOpacity("0.0");
            });
        }
        if ("down" == direccion) {
            $.vtextoPueblo.animate({
                top: 0,
                duration: 500
            }, function() {
                $.vtextoPueblo.setTop(0);
                $.vtextoPueblo.setZIndex(-1);
                $.vtextoPueblo.setHeight("100%");
            });
            $.ViewImagenPueblo.animate({
                opacity: 1,
                duration: 500
            }, function() {
                $.ViewImagenPueblo.setOpacity("1.0");
            });
        }
    }
    function swipe2(e) {
        $.textoPueblo2.setText("Inicio e: " + e.x + " y: " + e.y);
        yInicio = e.y;
    }
    function swipe3(e) {
        $.textoPueblo3.setText("Fin e: " + e.x + " y: " + e.y + " " + Titanium.Platform.displayCaps.platformHeight / 3);
        if (Titanium.Platform.displayCaps.platformHeight / 3 < -1 * diferencia) {
            $.vtextoPueblo.setTop(0);
            $.vtextoPueblo.setZIndex(-1);
            diferencia = 0;
        }
    }
    function swipe4(e) {
        e.y;
        diferencia = -1 * (yInicio - e.y);
        $.textoPueblo4.setText("Diferencia e: " + diferencia + " " + $.vtextoPueblo.getTop());
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
    swipe ? $.__views.winPueblo.addEventListener("swipe", swipe) : __defers["$.__views.winPueblo!swipe!swipe"] = true;
    swipe2 ? $.__views.winPueblo.addEventListener("touchstart", swipe2) : __defers["$.__views.winPueblo!touchstart!swipe2"] = true;
    swipe3 ? $.__views.winPueblo.addEventListener("touchend", swipe3) : __defers["$.__views.winPueblo!touchend!swipe3"] = true;
    swipe4 ? $.__views.winPueblo.addEventListener("touchmove", swipe4) : __defers["$.__views.winPueblo!touchmove!swipe4"] = true;
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
    $.__views.__alloyId14 = Ti.UI.createView({
        height: "1dp",
        backgroundColor: "#33000000",
        id: "__alloyId14"
    });
    $.__views.puebloContenedor.add($.__views.__alloyId14);
    $.__views.ViewImagenPueblo = Ti.UI.createView({
        backgroundColor: "black",
        color: "white",
        height: "30%",
        width: "100%",
        zIndex: "-2",
        id: "ViewImagenPueblo"
    });
    $.__views.puebloContenedor.add($.__views.ViewImagenPueblo);
    $.__views.imagenPueblo = Ti.UI.createImageView({
        width: "100%",
        zIndex: "-1",
        id: "imagenPueblo"
    });
    $.__views.ViewImagenPueblo.add($.__views.imagenPueblo);
    $.__views.imagenPuebloCheck = Ti.UI.createImageView({
        opacity: .5,
        backgroundColor: "transparent",
        id: "imagenPuebloCheck"
    });
    $.__views.ViewImagenPueblo.add($.__views.imagenPuebloCheck);
    $.__views.ViewDatosCheck = Ti.UI.createView({
        layout: "vertical",
        color: "white",
        top: "33%",
        id: "ViewDatosCheck"
    });
    $.__views.ViewImagenPueblo.add($.__views.ViewDatosCheck);
    $.__views.diaCheck = Ti.UI.createLabel({
        color: "white",
        shadowColor: "#66333333",
        shadowRadius: 3,
        shadowOffset: {
            x: 2,
            y: 2
        },
        id: "diaCheck"
    });
    $.__views.ViewDatosCheck.add($.__views.diaCheck);
    $.__views.horaCheck = Ti.UI.createLabel({
        color: "white",
        shadowColor: "#66333333",
        shadowRadius: 3,
        shadowOffset: {
            x: 2,
            y: 2
        },
        id: "horaCheck"
    });
    $.__views.ViewDatosCheck.add($.__views.horaCheck);
    $.__views.latitudchek = Ti.UI.createLabel({
        color: "white",
        shadowColor: "#66333333",
        shadowRadius: 3,
        shadowOffset: {
            x: 2,
            y: 2
        },
        id: "latitudchek"
    });
    $.__views.ViewDatosCheck.add($.__views.latitudchek);
    $.__views.longitudchek = Ti.UI.createLabel({
        color: "white",
        shadowColor: "#66333333",
        shadowRadius: 3,
        shadowOffset: {
            x: 2,
            y: 2
        },
        id: "longitudchek"
    });
    $.__views.ViewDatosCheck.add($.__views.longitudchek);
    $.__views.actionBotones = Ti.UI.createView({
        height: "44dp",
        color: "white",
        layout: "horizontal",
        textAlign: "center",
        id: "actionBotones"
    });
    $.__views.puebloContenedor.add($.__views.actionBotones);
    $.__views.__alloyId15 = Ti.UI.createView({
        textAlign: "center",
        width: "50%",
        id: "__alloyId15"
    });
    $.__views.actionBotones.add($.__views.__alloyId15);
    $.__views.chequearPueblo = Ti.UI.createImageView({
        image: "/material/ic_radio_button_off_white_48dp.png",
        height: "44dp",
        id: "chequearPueblo"
    });
    $.__views.__alloyId15.add($.__views.chequearPueblo);
    localizar ? $.__views.chequearPueblo.addEventListener("click", localizar) : __defers["$.__views.chequearPueblo!click!localizar"] = true;
    $.__views.__alloyId16 = Ti.UI.createView({
        textAlign: "center",
        width: "50%",
        id: "__alloyId16"
    });
    $.__views.actionBotones.add($.__views.__alloyId16);
    $.__views.compartirPueblo = Ti.UI.createImageView({
        image: "/material/ic_share_white_48dp.png",
        height: "44dp",
        id: "compartirPueblo"
    });
    $.__views.__alloyId16.add($.__views.compartirPueblo);
    $.__views.__alloyId17 = Ti.UI.createView({
        height: "1dp",
        backgroundColor: "#33000000",
        id: "__alloyId17"
    });
    $.__views.puebloContenedor.add($.__views.__alloyId17);
    $.__views.vtextoPueblo = Ti.UI.createScrollView({
        top: 0,
        backgroundColor: "white",
        width: "100%",
        color: "black",
        zIndex: "-1",
        layout: "vertical",
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
    $.__views.textoPueblo2 = Ti.UI.createLabel({
        id: "textoPueblo2"
    });
    $.__views.vtextoPueblo.add($.__views.textoPueblo2);
    $.__views.textoPueblo3 = Ti.UI.createLabel({
        id: "textoPueblo3"
    });
    $.__views.vtextoPueblo.add($.__views.textoPueblo3);
    $.__views.textoPueblo4 = Ti.UI.createLabel({
        id: "textoPueblo4"
    });
    $.__views.vtextoPueblo.add($.__views.textoPueblo4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var location = require("location");
    var args = arguments[0] || {};
    var data = [];
    var yInicio = 0;
    var diferencia = 0;
    var direccion = "";
    var newTopViewImagenPueblo = -1 * $.actionBotones.rect.y + 44;
    data = args;
    $.textoMenu.setText(data.name);
    $.puebloContenedor.setBackgroundColor(data.color);
    $.textoPueblo.setText(data.id + " " + data.descripcion + " " + data.gpsLat + " " + data.gpsLon + " " + data.imagen);
    $.imagenPueblo.setImage("/pueblos/" + data.imagen);
    sello(data.dia, data.hora, data.latitudchek, data.longitudchek);
    Ti.Gesture.addEventListener("shake", function() {
        localizar();
    });
    __defers["$.__views.winPueblo!swipe!swipe"] && $.__views.winPueblo.addEventListener("swipe", swipe);
    __defers["$.__views.winPueblo!touchstart!swipe2"] && $.__views.winPueblo.addEventListener("touchstart", swipe2);
    __defers["$.__views.winPueblo!touchend!swipe3"] && $.__views.winPueblo.addEventListener("touchend", swipe3);
    __defers["$.__views.winPueblo!touchmove!swipe4"] && $.__views.winPueblo.addEventListener("touchmove", swipe4);
    __defers["$.__views.botonMenu!click!cerrar"] && $.__views.botonMenu.addEventListener("click", cerrar);
    __defers["$.__views.chequearPueblo!click!localizar"] && $.__views.chequearPueblo.addEventListener("click", localizar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;