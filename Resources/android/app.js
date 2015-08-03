var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var db = Ti.Database.open("BD");

if (true == Ti.App.Properties.getBool("primer", true)) {
    db.execute("BEGIN");
    db.execute("CREATE TABLE IF NOT EXISTS pueblos(id INTEGER PRIMARY KEY, nombre TEXT, descripcion TEXT, latitud TEXT, longitud TEXT, dia TEXT, hora TEXT,	latitudchek TEXT, longitudchek TEXT)");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "ÁVILA", "descripcion", "40.6552873", "-4.7028309");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "NARRILLOS DE SAN LEONARDO", "descripcion", "40.6552873", "-4.7028309");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "CARDEÑOSA", "descripcion", "40.6552873", "-4.7028309");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "PEÑALBA DE ÁVILA", "descripcion", "40.6552873", "-4.7028309");
    db.execute("INSERT INTO pueblos (nombre,descripcion,latitud,longitud) VALUES (?,?,?,?)", "GOTARRENDURA", "descripcion", "40.6552873", "-4.7028309");
    db.execute("COMMIT");
    Ti.App.Properties.setBool("primer", true);
}

db.close();

Alloy.createController("index");