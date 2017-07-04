var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var ratingSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	},
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product'
	},
	rating_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	rating: {
		type: Number,
		required: true
	}
});

ratingSchema.plugin(generateId());

module.exports = mongoose.model('Rating', ratingSchema);
