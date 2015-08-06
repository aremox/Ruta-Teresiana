var location = require('location');
var args = arguments[0] || {};
var data = [];
data = args;
$.textoMenu.setText(data.name);
$.puebloContenedor.setBackgroundColor(data.color);
$.textoPueblo.setText(data.id+ " "+data.descripcion + " " + data.gpsLat + " " + data.gpsLon);
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
				Ti.API.info(responseLocation.latitude+" "+responseLocation.longitude);
				location.stop();
				compararGPS(responseLocation.latitude,responseLocation.longitude,chequearTeresiana);
			},
			error : function(e) {
				Ti.API.error(e);
				alert('Fallo obteniendo localización');
			}
		});
		
	} 
}


function compararGPS(latitude,longitude,callbak){
	
	distancis = location.distancia(data.gpsLat,data.gpsLon,latitude,longitude);
	if(distancis >= 0.3){
		Ti.API.info("menor de 300 metros: "+distancis);
		Ti.API.info(data.gpsLat+" "+data.gpsLon+" "+latitude+" "+longitude);
		callbak(latitude,longitude);
	}else{
		Ti.API.info("mas de 300 metros: "+distancis);
	}
}

function chequearTeresiana(latitude,longitude){
	var db = Ti.Database.open('BD');
	var fecha = new Date( Date.now());
	var d = getFormattedDate(fecha);
	var h = fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds(); 
	Ti.API.info("Id: "+data.id+" dia: "+d+" hora: "+h);
	db.execute('UPDATE pueblos SET dia=?,hora=? WHERE id=?',d,h,data.id);
	//db.execute('UPDATE pueblos SET dia='+d+',hora='+h+' WHERE id='+data.id+';');
	db.close();
	Ti.App.fireEvent('app:updateTables');
	
}

function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return year + month + day;
}
