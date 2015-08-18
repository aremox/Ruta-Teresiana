credencial();
var vista = Alloy.createController('listaPueblos').getView();
$.drawer.open();


function borrarHijos(callback) {
	for (var i = $.centroW.children.length - 1; i >= 0; i--) {
		Ti.API.info($.centroW.children[i].id + " (" + i + ")");
		
			Ti.API.info("Se elimina: " + $.centroW.children[i].id + " (" + i + ")");
			$.centroW.remove($.centroW.children[i]);
	}
	callback();
}

function credencial() {
	
	vista = $.vista = Alloy.createController('listaPueblos').getView();
	$.centroW.add($.vista);
	$.drawer.toggleLeftWindow();
}
function mapa() {
	for (var i = $.centroW.children.length - 1; i >= 0; i--) {
		Ti.API.info($.centroW.children[i].id + " (" + i + ")");
		
			Ti.API.info("Se elimina: " + $.centroW.children[i].id + " (" + i + ")");
			$.centroW.remove($.centroW.children[i]);
	}
	$.vista = Alloy.createController('mapa').getView();
	$.centroW.add($.vista);
	$.drawer.toggleLeftWindow();
}

$.listViewMenu.addEventListener('itemclick', function(e) {
	var item = $.menuSection.getItemAt(e.itemIndex);
	Ti.API.info(item.itemId);

	switch (e.itemId) {
	case  "boton1":
		borrarHijos(credencial);
		break;
	case "boton2":
	borrarHijos(mapa);
		break;
	case "boton3":
		//favoritosBoton();
		break;
	default:
		alert("ItemId: " + e.itemId + "\n" + "BindId: " + e.bindId + "\n" + "Section Index: " + e.sectionIndex + ", Item Index: " + e.itemIndex);
	}

}); 