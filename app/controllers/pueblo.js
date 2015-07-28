var location = require('location');
var args = arguments[0] || {};
var data = [];
data = args;
$.textoMenu.setText(data.name);
$.puebloContenedor.setBackgroundColor(data.color);
$.textoPueblo.setText(data.descripcion + " " + data.gpsLat + " " + data.gpsLon);
Titanium.API.info('data Value::' + data.descripcion + " " + data.gpsLat + " " + data.gpsLon);
$.imagenPueblo.setText("foto");
function cerrar() {
	
	if (OS_ANDROID) {
		var actividad = $.winPueblo.getActivity();
		actividad.finish();
	} else {
		$.winPueblo.close();
	}
}

function localizar() {
	
	if (Titanium.Geolocation.locationServicesEnabled === false)
{
	Ti.API.error('error :gps no activado');
	alert('error :gps no activado');
}
else
{
		location.start({
			action : function(responseLocation) {
				// Do something after getting location.
				Ti.API.warn(responseLocation.latitude+" "+responseLocation.longitude);
				location.stop();
				Ti.API.warn(location.distancia(data.gpsLat,data.gpsLon,responseLocation.latitude,responseLocation.longitude));
			},
			error : function(e) {
				Ti.API.error(e);
			}
		});
		
	} 
}