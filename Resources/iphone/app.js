var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var db = Ti.Database.open("BD");

if (true == Ti.App.Properties.getBool("primer", true)) {
    db.execute("BEGIN");
    db.execute("CREATE TABLE IF NOT EXISTS pueblos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, descripcion TEXT, latitud TEXT, longitud TEXT, dia TEXT, hora TEXT, latitudchek TEXT, longitudchek TEXT)");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "ÁVILA", "descripcion", "40.6552873", "-4.7028309");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "NARRILLOS DE SAN LEONARDO", "descripcion", "40.6961216", "-4.7246942");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "CARDEÑOSA", "descripcion", "40.7422301", "-4.7436752");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "PEÑALBA DE ÁVILA", "descripcion", "40.7717097", "-4.7464242");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "GOTARRENDURA", "descripcion", "40.8255596", "-4.7402645");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "EL OSO", "descripcion", "40.8401981", "-4.7697875");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "PAPATRIGO", "descripcion", "40.8675266", "-4.8330634");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "NARROS DE SALDUEÑA", "descripcion", "40.8732141", "-4.8694079");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "COLLADO DE CONTRERAS", "descripcion", "40.8869863", "-4.9309939");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "FONTIVEROS", "descripcion", "40.9258861", "-4.9563748");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "RIVILLA DE BARAJAS", "descripcion", "40.9023417", "-4.9871718");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "NARROS DEL CASTILLO", "descripcion", "40.857464", "-5.063238");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "CONVENTO DE DURUELO (BLASCOMILLÁN)", "descripcion", "40.8341393", "-5.1294729");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "MANCERA DE ABAJO", "descripcion", "40.8394414", "-5.198222");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "MACOTERA", "descripcion", "40.8306587", "-5.2868701");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "TORDILLOS", "descripcion", "40.8520586", "-5.3542268");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "LA LURDA", "descripcion", "40.8487924", "-5.4203036");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "GARCIHERNANDEZ", "descripcion", "40.8487924", "-5.4203036");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "ALBA DE TORMES", "descripcion", "40.8487924", "-5.4203036");
    db.execute("COMMIT");
    Ti.App.Properties.setBool("primer", true);
}

db.close();

Alloy.createController("index");