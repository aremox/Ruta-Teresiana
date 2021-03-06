function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.drawer/" + s : s.substring(0, index) + "/nl.fokkezb.drawer/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0001,
    key: "container",
    style: {
        fullscreen: true,
        navBarHidden: true
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "barrasDeAccion",
    style: {
        height: "44dp",
        color: "white",
        layout: "horizontal",
        textAlign: "center"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "barrasDeAccionSombra",
    style: {
        height: "1dp",
        backgroundColor: "#33000000"
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "chequear",
    style: {
        image: "/material/ic_radio_button_off_white_48dp.png",
        height: "44dp"
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "compartir",
    style: {
        image: "/material/ic_share_white_48dp.png",
        height: "44dp"
    }
}, {
    isClass: true,
    priority: 10000.001,
    key: "bloque-1-2",
    style: {
        textAlign: "center",
        width: "50%"
    }
}, {
    isClass: true,
    priority: 10101.0002,
    key: "container",
    style: {
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        fullscreen: true
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "iosBar",
    style: {
        top: 0,
        height: "18dp",
        backgroundColor: "#33999999",
        zIndex: 10
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "actionBar",
    style: {
        top: 0,
        height: "44dp",
        color: "white",
        layout: "default"
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "textoMenu",
    style: {
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
        right: "55dp"
    }
} ];