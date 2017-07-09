var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var sampleProduct = {
	"name": "Mung Beans",
	"category": "595f1c38dd9a1d226d38a94e",
	"description": "Urad (also known as black gram, black lentil, Hindi: urad, Gujarati: adad), is a little black seed with a white interior",
	"soh": 200,
	"price": 8,
	"image": '15.png'
}

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
		ref: 'Category'
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
		ref: 'Rating'
	}],
	comments: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Comment'
	}]
});

productSchema.plugin(generateId());

module.exports = mongoose.model('Product', productSchema);
