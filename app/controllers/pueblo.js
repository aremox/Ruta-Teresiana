var location = require('location');
var args = arguments[0] || {};
var data = [];
var yInicio = 0;
var diferencia = 0;
var direccion = "";
var newTopViewImagenPueblo = ($.actionBotones.rect.y * -1) + 44;
data = args;
$.textoMenu.setText(data.name);
$.puebloContenedor.setBackgroundColor(data.color);
$.textoPueblo.setText(data.id + " " + data.descripcion + " " + data.gpsLat + " " + data.gpsLon + " " + data.imagen);

$.imagenPueblo.setImage("/pueblos/" + data.imagen);
sello(data.dia, data.hora, data.latitudchek, data.longitudchek);

function cerrar() {

	if (OS_ANDROID) {
		var actividad = $.winPueblo.getActivity();
		actividad.finish();
	} else {
		$.winPueblo.close();
	}
}

function localizar() {
	//	if ((data.dia != null) || (data.hora != null) || (data.latitudchek != null) || (data.longitudchek != null)) {
	if (Titanium.Geolocation.locationServicesEnabled === false) {
		Ti.API.error('error :gps no activado');
		alert('error :gps no activado');
	} else {
		location.start({
			action : function(responseLocation) {
				// Do something after getting location.
				Ti.API.info(responseLocation.latitude + " " + responseLocation.longitude);
				location.stop();
				compararGPS(responseLocation.latitude, responseLocation.longitude, chequearTeresiana);
			},
			error : function(e) {
				Ti.API.error(e);
				alert('Fallo obteniendo localización');
			}
		});

	}
	//}
}

function compararGPS(latitude, longitude, callbak) {

	distancis = location.distancia(data.gpsLat, data.gpsLon, latitude, longitude);
	if (distancis >= 0.3) {
		Ti.API.info("menor de 300 metros: " + distancis);
		Ti.API.info(data.gpsLat + " " + data.gpsLon + " " + latitude + " " + longitude);
		$.chequearPueblo.setImage("/material/ic_radio_button_on_white_48dp.png");
		callbak(latitude, longitude);
	} else {
		Ti.API.info("mas de 300 metros: " + distancis);
	}
}

function chequearTeresiana(latitude, longitude) {
	var db = Ti.Database.open('BD');
	var fecha = new Date(Date.now());
	var d = getFormattedDate(fecha);
	var h = getFormattedHora(fecha);
	Ti.API.info("Id: " + data.id + " dia: " + d + " hora: " + h);
	db.execute('UPDATE pueblos SET dia=?,hora=?,latitudchek=?,longitudchek=? WHERE id=?', d, h, latitude, longitude, data.id);
	db.close();
	sello(d, h, latitude, longitude);
	Ti.App.fireEvent('app:updateTables');

}

function sello(dia, hora, latitudchek, longitudchek) {
	Titanium.API.info('data Value::' + dia + " " + hora + " " + latitudchek + " " + longitudchek);
	if ((dia != null) && (hora != null) && (latitudchek != null) && (longitudchek != null)) {
		$.chequearPueblo.setImage("/material/ic_radio_button_on_white_48dp.png");
		$.diaCheck.setText(dia);
		$.horaCheck.setText(hora);
		//$.latitudchek.setText(latitudchek);
		//$.longitudchek.setText(longitudchek);
		$.imagenPuebloCheck.setImage("/caminosteresianos_transparente.png");
	}
}

function getFormattedDate(date) {
	var year = date.getFullYear();
	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return day + "-" + month + "-" + year;
}

function getFormattedHora(date) {
	var hora = (1 + date.getHours()).toString();
	hora = hora.length > 1 ? hora : '0' + hora;
	var min = (1 + date.getMinutes()).toString();
	min = min.length > 1 ? min : '0' + min;
	var seg = (1 + date.getSeconds()).toString();
	seg = seg.length > 1 ? seg : '0' + seg;
	return hora + ":" + min + ":" + seg;
}

Ti.Gesture.addEventListener('shake', function(e) {
	localizar();
});

function swipe(e) {
	//alert("swipe");

	$.textoPueblo.setText("direccion: " + e.direction + " " + newTopViewImagenPueblo);
	direccion = e.direction;
	if (direccion == "up") {
		$.vtextoPueblo.setHeight(Titanium.Platform.displayCaps.platformHeight-44);
		var newTopvtextoPueblo = ($.vtextoPueblo.rect.y * -1) + 44 ;
		$.vtextoPueblo.animate({
			top : newTopvtextoPueblo,
			zIndex: 0,
			duration : 500
		}, function() {
			$.vtextoPueblo.setTop(newTopvtextoPueblo);
			
			$.vtextoPueblo.setZIndex(4);
		});
		$.ViewImagenPueblo.animate({
			opacity: 0.0,
			duration : 500
		},function() {
			$.ViewImagenPueblo.setOpacity("0.0");
		});
	}
	if (direccion == "down") {
		$.vtextoPueblo.animate({
			top : 0,
			duration : 500
		}, function() {
			$.vtextoPueblo.setTop(0);
			$.vtextoPueblo.setZIndex(-1);
			$.vtextoPueblo.setHeight("100%");
		});
		
		$.ViewImagenPueblo.animate({
			opacity: 1.0,
			duration : 500
		},function() {
			$.ViewImagenPueblo.setOpacity("1.0");
		});
	}

}

function swipe2(e) {
	//alert("swipe");
	$.textoPueblo2.setText("Inicio e: " + e.x + " y: " + e.y);
	yInicio = e.y;
}

function swipe3(e) {
	//alert("swipe");
	$.textoPueblo3.setText("Fin e: " + e.x + " y: " + e.y + " " + (Titanium.Platform.displayCaps.platformHeight / 3));
	if ((Titanium.Platform.displayCaps.platformHeight / 3 ) < (diferencia * -1)) {
		$.vtextoPueblo.setTop(0);
		$.vtextoPueblo.setZIndex(-1);
		diferencia = 0;
	}
}

function swipe4(e) {
	//alert("swipe");
	var yMover = e.y;
	diferencia = (yInicio - e.y) * (-1);
	$.textoPueblo4.setText("Diferencia e: " + diferencia + " " + $.vtextoPueblo.getTop());
	/*if((direccion == "up")&&(diferencia < 0)&&($.vtextoPueblo.getTop() > diferencia)){
	 $.vtextoPueblo.setTop(diferencia);
	 $.vtextoPueblo.setZIndex(0);
	 }*/
}

