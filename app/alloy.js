// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var db = Ti.Database.open('BD');
//db.execute('DROP TABLE pueblos');
if (Ti.App.Properties.getBool('primer', true) == true) {

	db.execute('BEGIN');

	db.execute('CREATE TABLE IF NOT EXISTS pueblos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, descripcion TEXT, latitud TEXT, longitud TEXT, dia TEXT, hora TEXT, latitudchek TEXT, longitudchek TEXT, imagen TEXT)');
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "ÁVILA", "descripcion", "40.6552873", "-4.7028309", "avila.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "NARRILLOS DE SAN LEONARDO", "descripcion", "40.6961216", "-4.7246942", "narrillos.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "CARDEÑOSA", "descripcion", "40.7422301", "-4.7436752", "cardenosa.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "PEÑALBA DE ÁVILA", "descripcion", "40.7717097", "-4.7464242", "penalba.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "GOTARRENDURA", "descripcion", "40.8255596", "-4.7402645", "gotarrendura.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "EL OSO", "descripcion", "40.8401981", "-4.7697875", "el_oso.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "PAPATRIGO", "descripcion", "40.8675266", "-4.8330634", "papatrigo.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "NARROS DE SALDUEÑA", "descripcion", "40.8732141", "-4.8694079", "narros_salduena.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "COLLADO DE CONTRERAS", "descripcion", "40.8869863", "-4.9309939", "revilla.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "FONTIVEROS", "descripcion", "40.9258861", "-4.9563748", "fontiveros.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "RIVILLA DE BARAJAS", "descripcion", "40.9023417", "-4.9871718", "revilla.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "NARROS DEL CASTILLO", "descripcion", "40.857464", "-5063238", "narros_del_castillo.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "CONVENTO DE DURUELO (BLASCOMILLÁN)", "descripcion", "40.8341393", "-51294729", "duruelo.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "MANCERA DE ABAJO", "descripcion", "40.8394414", "-5198222", "macera.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "MACOTERA", "descripcion", "40.8306587", "-52868701", "macotera.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "TORDILLOS", "descripcion", "40.8520586", "-53542268", "tordillos.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "LA LURDA", "descripcion", "40.8487924", "-54203036", "garcihernandez.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "GARCIHERNANDEZ", "descripcion", "40.8487924", "-54203036", "garcihernandez.jpg");
	db.execute('INSERT INTO pueblos (nombre,descripcion,latitud,longitud,imagen) VALUES (?,?,?,?,?)', "ALBA DE TORMES", "descripcion", "40.8487924", "-54203036", "alba.jpg");
	db.execute('COMMIT');

	Ti.App.Properties.setBool('primer', false);
}
db.close();
