var User = require('../models/user');
var handleError = require('./helper').handleError;
var responseWithResult = require('./helper').responseWithResult;
var handleEntityNotFound = require('./helper').handleEntityNotFound;


module.exports = {

	findAll: function (req, res, next) {
		User
			.find({}, {first_name: 1, last_name: 1, email: 1, gender: 1, mobile: 1, id: 1})
			.then(responseWithResult(res))
			.catch(handleError(res))
	},

	findById: function (req, res, next) {
		User
			.findOne({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	create: function (req, res, next) {
		User
			.create(req.body)
			.then(responseWithResult(res, 201))
			.catch(handleError(res));
	},

	update: function (req, res, next) {
		User
			.findOneAndUpdate({id: req.params.id}, req.body)
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res))
			.catch(handleError(res));
	},

	delete: function (req, res, next) {
		User
			.findOneAndRemove({id: req.params.id})
			.then(handleEntityNotFound(res))
			.then(responseWithResult(res, 204))
			.catch(handleError(res));
	},

	authenticate: function (req, res) {
		User
			.findOne({email: req.body.email})
			.then(handleEntityNotFound(res))
			.then(function (user) {
				return new Promise(function (resolve, reject) {
					if (user.authenticate(req.body.password))
						resolve({isAuthenicated: true});
					else
						reject(null);
				})
			})
			.then(responseWithResult(res))
			.catch(handleError(res, 401));
	}
};

