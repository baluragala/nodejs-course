var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');

var commentSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	},
	text: {
		type: String,
		required: true
	},
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product'
	},
	comment_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	comment_date: {
		type: Date,
		required: false
	}
});

commentSchema.plugin(generateId());

module.exports = mongoose.model('Comment', commentSchema);
