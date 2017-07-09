var mongoose = require('mongoose');

var sampleUser = {
	"email": "bala@zeolearn",
	"first_name": "bala",
	"last_name": "ragala",
	"password": "1234"
};

var addressSchema = new mongoose.Schema({
	line1: String,
	line2: String,
	city: String,
	state: String
});


module.exports = addressSchema;
