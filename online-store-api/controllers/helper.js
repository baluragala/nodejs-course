exports.handleError = function (res, statusCode) {
	statusCode = statusCode || 500;
	return function (err) {
		console.error(err, statusCode);
		res.status(statusCode).send(err);
	};
}

exports.responseWithResult = function (res, statusCode) {
	statusCode = statusCode || 200;
	return function (entity) {
		if (entity) {
			res.status(statusCode).json(entity);
		}
	};
};

exports.handleEntityNotFound = function (res) {
	return function (entity) {
		if (!entity) {
			res.status(404).end();
			return null;
		}
		return entity;
	};
};