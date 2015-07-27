var args = arguments[0] || {};
var data = [];
data = args;
$.textoMenu.setText(data.name);
$.puebloContenedor.setBackgroundColor(data.color);
$.textoPueblo.setText(data.descripcion + " " + data.gpsLat+" "+data.gpsLon);
Titanium.API.info('data Value::' + data.descripcion + " " + data.gpsLat+" "+data.gpsLon);
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
	//if (OS_IOS) {
		if (Ti.Geolocation.locationServicesEnabled) {
			Ti.Geolocation.purpose = 'Get Current Location';
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.distanceFilter = 0;
			Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
			Ti.Geolocation.addEventListener('location', function(e) {
				if (e.error) {
					alert('Error: ' + e.error);
				} else {
					Ti.API.info(e.coords);
				}
			});
		} else {
			alert('Please enable location services');
		}
/*	}else{
		alert('Please enable location services');
	}*/
}
