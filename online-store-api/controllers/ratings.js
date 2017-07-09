var Rating = require('../models/rating');
var Product = require('../models/product');
var handleError = require('./helper').handleError;
var responseWithResult = require('./helper').responseWithResult;
var handleEntityNotFound = require('./helper').handleEntityNotFound;


function addRatingToProduct(res) {
	return function (rating) {
		Product
			.findByIdAndUpdate(rating.product_id, {$push: {ratings: rating._id}})
			.then(responseWithResult(res, 201))
			.catch(handleError(res));
	}
}

module.exports = {

	findAll: function (req, res, next) {
		Rating
			.find()
			.then(responseWithResult(res))
			.catch(handleError(res))
	},

	findById: function (req, res, next) {
		Rating
			.findOne({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	create: function (req, res, next) {
		Rating
			.create(req.body)
			.then(addRatingToProduct(res))

	},

	update: function (req, res, next) {
		Rating
			.findOneAndUpdate({id: req.params.id}, req.body)
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	delete: function (req, res, next) {
		Rating
			.findOneAndRemove({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res, 204))
			.catch(handleError(res));
	}
};

