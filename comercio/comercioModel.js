var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var comercioSchema = new Schema({
	'convenio' : String,
	'KAM' : String,
	'RUC' : String,
	'NombreComercialMarca' : String,
	'Categoria' : String,
	'Promocion' : String,
	'Desde' : String,
	'Hasta' : String,
	'Campana' : String,
	'TC' : String,
	'TD' : String,
	'PSI' : String,
	'PV' : String,
	'Direcciones' : String,
	'latitude' : String,
	'longitude' : String,
	'TerminosyCondiciones' : String,
	'Masa' : String,
	'Core' : String,
	'Premium' : String
});

module.exports = mongoose.model('comercio', comercioSchema);
