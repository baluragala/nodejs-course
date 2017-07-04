var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var productSchema = new mongoose.Schema({
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
		trim: true,
		lowercase: true
	},
	category: {
		type: mongoose.Schema.ObjectId,
		ref: 'Cart'
	},
	description: {
		type: String,
		required: true
	},
	soh: {
		type: Number,
		required: true,
		default: 1
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	image: {
		type: String,
		required: false
	},
	ratings: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	comments: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Comment'
	}]
});

productSchema.plugin(generateId());

module.exports = mongoose.model('Product', productSchema);
