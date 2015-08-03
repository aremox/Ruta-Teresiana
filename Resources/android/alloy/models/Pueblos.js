var Alloy = require('alloy'),
    _ = require("alloy/underscore")._,
	model, collection;

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "nombre": "text",
		    "descripcion": "text",
		    "latitud": "text",
		    "longitud": "text",
		    "dia": "text",
		    "hora": "text",
		    "latitudchek": "text",
		    "longitudchek": "text",
		},
		adapter: {
			type: "sql",
			collection_name: "pueblos",
			idAttribute : 'id',
			db_name : 'BD'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};


model = Alloy.M('pueblos',
	exports.definition,
	[]
);

collection = Alloy.C('pueblos',
	exports.definition,
	model
);

exports.Model = model;
exports.Collection = collection;
