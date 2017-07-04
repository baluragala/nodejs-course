var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var categorySchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	},
	name: {
		type: String,
		required: true,
		lowercase: true
	}
});

categorySchema.plugin(generateId());

module.exports = mongoose.model('Category', categorySchema);
