var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pagoSchema = new Schema({
	'codOperacion' : Number,
	'telefono' : String,
	'monto' : Number,
	'producto' : String,
	'dateoperacion' : Date,
	'comercio' : String
});

module.exports = mongoose.model('pago', pagoSchema);
