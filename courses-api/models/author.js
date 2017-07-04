var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var authorSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	experience: {
		type: Number,
		required: true
	},
	courses: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Course'
	}]
});

authorSchema.plugin(generateId());

module.exports = mongoose.model('Author', authorSchema);
