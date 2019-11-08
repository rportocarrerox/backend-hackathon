var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'userID' : String,
	'password' : String,
	'tipoDOC' : String,
	'email' : String,
	'perfil' : String,
	'nombre' : String,
	'nombreCOM' : String,
	'logueado' : Boolean
});

module.exports = mongoose.model('user', userSchema);
