function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function borrarHijos(callback) {
        for (var i = $.centroW.children.length - 1; i >= 0; i--) {
            Ti.API.info($.centroW.children[i].id + " (" + i + ")");
            Ti.API.info("Se elimina: " + $.centroW.children[i].id + " (" + i + ")");
            $.centroW.remove($.centroW.children[i]);
        }
        callback();
    }
    function credencial() {
        vista = $.vista = Alloy.createController("listaPueblos").getView();
        $.centroW.add($.vista);
        $.drawer.toggleLeftWindow();
    }
    function mapa() {
        for (var i = $.centroW.children.length - 1; i >= 0; i--) {
            Ti.API.info($.centroW.children[i].id + " (" + i + ")");
            Ti.API.info("Se elimina: " + $.centroW.children[i].id + " (" + i + ")");
            $.centroW.remove($.centroW.children[i]);
        }
        $.vista = Alloy.createController("mapa").getView();
        $.centroW.add($.vista);
        $.drawer.toggleLeftWindow();
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
    $.__views.menuIzq = (require("xp.ui").createWindow || Ti.UI.createWindow)({
        backgroundColor: "white",
        id: "menuIzq",
        role: "leftWindow"
    });
    var __alloyId0 = {};
    var __alloyId3 = [];
    var __alloyId4 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            bindId: "pic"
        }
    };
    __alloyId3.push(__alloyId4);
    var __alloyId5 = {
        type: "Ti.UI.Label",
        bindId: "info",
        properties: {
            bindId: "info"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId6 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            bindId: "es_info"
        }
    };
    __alloyId3.push(__alloyId6);
    var __alloyId2 = {
        properties: {
            name: "templateMenu"
        },
        childTemplates: __alloyId3
    };
    __alloyId0["templateMenu"] = __alloyId2;
    var __alloyId8 = [];
    $.__views.__alloyId9 = {
        properties: {
            itemId: "boton1",
            id: "__alloyId9"
        },
        info: {
            text: "Andariega"
        }
    };
    __alloyId8.push($.__views.__alloyId9);
    $.__views.__alloyId10 = {
        properties: {
            itemId: "boton2",
            id: "__alloyId10"
        },
        info: {
            text: "Mapa"
        }
    };
    __alloyId8.push($.__views.__alloyId10);
    $.__views.__alloyId11 = {
        properties: {
            itemId: "boton3",
            id: "__alloyId11"
        },
        info: {
            text: "Caminante"
        }
    };
    __alloyId8.push($.__views.__alloyId11);
    $.__views.__alloyId12 = {
        properties: {
            itemId: "boton3",
            id: "__alloyId12"
        },
        info: {
            text: "Ayuda"
        }
    };
    __alloyId8.push($.__views.__alloyId12);
    $.__views.menuSection = Ti.UI.createListSection({
        id: "menuSection"
    });
    $.__views.menuSection.items = __alloyId8;
    var __alloyId13 = [];
    __alloyId13.push($.__views.menuSection);
    $.__views.listViewMenu = Ti.UI.createListView({
        sections: __alloyId13,
        templates: __alloyId0,
        id: "listViewMenu",
        defaultItemTemplate: "templateMenu"
    });
    $.__views.menuIzq.add($.__views.listViewMenu);
    $.__views.centroW = (require("xp.ui").createWindow || Ti.UI.createWindow)({
        backgroundColor: "white",
        id: "centroW",
        role: "centerWindow"
    });
    $.__views.drawer = Alloy.createWidget("nl.fokkezb.drawer", "widget", {
        openDrawerGestureMode: "OPEN_MODE_ALL",
        closeDrawerGestureMode: "CLOSE_MODE_MARGIN",
        leftDrawerWidth: 200,
        rightDrawerWidth: 200,
        drawerLayout: true,
        id: "drawer",
        children: [ $.__views.menuIzq, $.__views.centroW ]
    });
    $.__views.drawer && $.addTopLevelView($.__views.drawer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    credencial();
    var vista = Alloy.createController("listaPueblos").getView();
    $.drawer.open();
    $.listViewMenu.addEventListener("itemclick", function(e) {
        var item = $.menuSection.getItemAt(e.itemIndex);
        Ti.API.info(item.itemId);
        switch (e.itemId) {
          case "boton1":
            borrarHijos(credencial);
            break;

          case "boton2":
            borrarHijos(mapa);
            break;

          case "boton3":
            break;

          default:
            alert("ItemId: " + e.itemId + "\nBindId: " + e.bindId + "\nSection Index: " + e.sectionIndex + ", Item Index: " + e.itemIndex);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;