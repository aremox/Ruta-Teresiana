var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            nombre: "text",
            descripcion: "text",
            latitud: "text",
            longitud: "text",
            dia: "text",
            hora: "text",
            latitudchek: "text",
            longitudchek: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "pueblos",
            idAttribute: "id",
            db_name: "BD"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("pueblos", exports.definition, []);

collection = Alloy.C("pueblos", exports.definition, model);

exports.Model = model;

exports.Collection = collection;