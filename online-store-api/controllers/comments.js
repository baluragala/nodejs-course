var Comment = require('../models/comment');
let Product = require('../models/product');
var handleError = require('./helper').handleError;
var responseWithResult = require('./helper').responseWithResult;
var handleEntityNotFound = require('./helper').handleEntityNotFound;

function addCommentToProduct(res) {
	return function (comment) {
		Product
			.findByIdAndUpdate(comment.product_id, {$push: {comments: comment._id}})
			.then(responseWithResult(res))
			.catch(handleError(res));
	}
}

module.exports = {

	findAll: function (req, res, next) {
		Comment
			.find()
			.then(responseWithResult(res))
			.catch(handleError(res))
	},

	findById: function (req, res, next) {
		Comment
			.findOne({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	create: function (req, res, next) {
		Comment
			.create(req.body)
			.then(addCommentToProduct(res))

	},

	update: function (req, res, next) {
		Comment
			.findOneAndUpdate({id: req.params.id}, req.body)
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	delete: function (req, res, next) {
		Comment
			.findOneAndRemove({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res, 204))
			.catch(handleError(res));
	}
};

