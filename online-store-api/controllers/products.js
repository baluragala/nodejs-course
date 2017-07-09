var Product = require('../models/product');
var handleError = require('./helper').handleError;
var responseWithResult = require('./helper').responseWithResult;
var handleEntityNotFound = require('./helper').handleEntityNotFound;

module.exports = {
	findAll: function (req, res, next) {
		Product
			.find()
			.then(responseWithResult(res))
			.catch(handleError(res))

	},

	findAllByCategory: function (req, res, next) {
		Product
			.find({category: req.params.categoryId})
			.then(responseWithResult(res))
			.catch(handleError(res))
	},

	findById: function (req, res, next) {
		Product.findOne({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	findWithCategory: function (req, res, next) {
		Product.find()
			.populate('category')
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	findWithComments: function (req, res, next) {
		Product.find()
			.populate('comments')
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	findWithRatings: function (req, res, next) {
		Product.find()
			.populate('ratings')
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	create: function (req, res, next) {
		Product.create(req.body)
			.then(responseWithResult(res, 201))
			.catch(handleError(res));
	},

	update: function (req, res, next) {
		Product.findOneAndUpdate({id: req.params.id}, req.body)
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	delete: function (req, res, next) {
		Product.findOneAndRemove({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res, 204))
			.catch(handleError(res));
	}
};

