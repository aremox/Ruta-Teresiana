var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "int",
            nombre: "string",
            latitud: "string",
            longitud: "string",
            dia: "string",
            hora: "string",
            latitudchek: "string",
            longitudchek: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "pueblos"
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