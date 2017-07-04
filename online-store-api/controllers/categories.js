var Category = require('../models/category');
var handleError = require('./helper').handleError;
var responseWithResult = require('./helper').responseWithResult;
var handleEntityNotFound = require('./helper').handleEntityNotFound;


module.exports = {

	findAll: function (req, res, next) {
		Category
			.find()
			.then(responseWithResult(res))
			.catch(handleError(res))
	},

	findById: function (req, res, next) {
		Category.findOne({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	create: function (req, res, next) {
		Category.create(req.body)
			.then(responseWithResult(res, 201))
			.catch(handleError(res));
	},

	update: function (req, res, next) {
		Category.findOneAndUpdate({id: req.params.id}, req.body)
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	delete: function (req, res, next) {
		Category.findOneAndRemove({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res, 204))
			.catch(handleError(res));
	}
};

