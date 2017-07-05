var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');
let sampleComment = {
	"text": "Good Product",
	"product_id": "595d27904170e391363b6541",
	"comment_by": "595d243b8461eb8f02dc88fb"
}
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
		required: false,
		default: Date.now
	}
});

commentSchema.plugin(generateId());

module.exports = mongoose.model('Comment', commentSchema);
