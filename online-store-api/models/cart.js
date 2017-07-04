var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var cartSchema = new mongoose.Schema({
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
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	quantity: {
		type: Number,
		required: true
	}
});

cartSchema.plugin(generateId());

module.exports = mongoose.model('Cart', cartSchema);
