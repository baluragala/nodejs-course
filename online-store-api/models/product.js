var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var sampleProduct = {
	"name":"iPhone 7",
	"category":"595d268f316a7890b358ffb5",
	"description":"A phone by apple inc.,",
	"soh":200,
	"price":600,
	"image":''
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
