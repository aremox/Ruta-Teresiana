var callback,
    error;
var timeout;
var location = {};

function firstLocation(e) {
	Ti.API.info('firstLocation');
	if (e.success === undefined || e.success) {
		if ( typeof (callback) === 'function') {
			clearTimeout(timeout);
			setLocation(e);
			log();
			callback(location);
			Ti.Geolocation.removeEventListener("location", firstLocation);

			// Might get more accurate readings if we leave a listener open.
			Ti.Geolocation.addEventListener("location", subsequentLocations);
		}
	} else {
		error(translateErrorCode(e.error));
	}
}

function subsequentLocations(e) {
	if ( typeof (callback) === 'function') {
		setLocation(e);
		log();
	}
}

function setLocation(e) {
	if (e.coords) {
		location.latitude = e.coords.latitude;
		location.longitude = e.coords.longitude;
	}
}

function log() {
	Ti.API.info('latitude is: ' + location.latitude);
	Ti.API.info('longitude is: ' + location.longitude);
}

function start(obj) {
	if (Titanium.Platform.name != 'android') {
		var authorization = Titanium.Geolocation.locationServicesAuthorization;
		Ti.API.info('Authorization: '+authorization);
		if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
			Ti.UI.createAlertDialog({
				title:'Kitchen Sink',
				message:'You have disallowed Titanium from running geolocation services.'
			}).show();
		}
		else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
			Ti.UI.createAlertDialog({
				title:'Kitchen Sink',
				message:'Your system has disallowed Titanium from running geolocation services.'
			}).show();
		}
	}
	callback = obj.action;
	error = obj.error ||
	function() {
	};

	/*timeout = setTimeout(function() {
		error("Timeout");
		stop();
	}, 25000);
*/
	Titanium.Geolocation.distanceFilter = 10;

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

	Ti.Geolocation.frequency = 0;
	Ti.API.info('Esperando evento');
	
	Ti.Geolocation.addEventListener("location", firstLocation);

}

function stop() {
	callback = undefined;
	error = undefined;
	clearTimeout(timeout);
	timeout = undefined;
	location = {};
/*	Titanium.Geolocation.distanceFilter = undefined;
	Titanium.Geolocation.accuracy = undefined;
	Ti.Geolocation.preferredProvider = undefined;
	Ti.Geolocation.frequency = undefined;*/
	Ti.Geolocation.removeEventListener("location", firstLocation);
	Ti.Geolocation.removeEventListener("location", subsequentLocations);
	Ti.API.info('GPS Parado');
}

function translateErrorCode(code) {
	if (code == null) {
		return null;
	}
	switch (code) {
	case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
		return "Location unknown";
	case Ti.Geolocation.ERROR_DENIED:
		return "Access denied";
	case Ti.Geolocation.ERROR_NETWORK:
		return "Network error";
	case Ti.Geolocation.ERROR_HEADING_FAILURE:
		return "Failure to detect heading";
	case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
		return "Region monitoring access denied";
	case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
		return "Region monitoring access failure";
	case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
		return "Region monitoring setup delayed";
	}
}

//Distancia = Dist(lat1, lon1, lat2, lon2);   //Retorna numero en Km

function Dist(lat1, lon1, lat2, lon2) {
	rad = function(x) {
		return x * Math.PI / 180;
	};

	var R = 6378.137;
	//Radio de la tierra en km
	var dLat = rad(lat2 - lat1);
	var dLong = rad(lon2 - lon1);

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;

	return d.toFixed(3);
	//Retorna tres decimales
}

exports.distancia = Dist;
exports.start = start;
exports.stop = stop;