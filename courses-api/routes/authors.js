var Author = require('../models/author');
var Course = require('../models/course');

module.exports = {

	findAll: function (req, res, next) {

		/*Author.find(function (err, authors) {
		 if (err) return res.status(400).json(err);

		 res.status(200).json(authors);
		 });*/

		Author
			.find({}, {first_name: 1})
			.then(function (authors) {
				res.status(200).json(authors);
			})
			.catch(function (err) {
				res.status(400).json(err);
			});
	},


	create: function (req, res, next) {
		/*Author.create(req.body, function (err, author) {
		 if (err) return res.status(400).json(err);

		 res.status(201).json(author);
		 });*/

		Author
			.create(req.body)
			.then(function (author) {
				res.status(201).json(author);
			})
			.catch(function (err) {
				res.status(400).json(err);
			})
	},


	find: function (req, res, next) {
		Author.findOne({id: req.params.id})
			.then(function (err, author) {
				if (err) return res.status(400).json(err);
				if (!author) return res.status(404).json();

				res.status(200).json(author);
			});
	},


	update: function (req, res, next) {
		Author.findOneAndUpdate({id: req.params.id}, req.body, function (err, author) {
			if (err) return res.status(400).json(err);
			if (!author) return res.status(404).json();

			res.status(200).json(author);
		});
	},


	delete: function (req, res, next) {
		Author.findOneAndRemove({id: req.params.id}, function (err) {
			if (err) return res.status(400).json(err);

			res.status(204).json();
		});
	},


	addCourse: function (req, res, next) {
		Author.findOne({id: req.params.id}, function (err, author) {
			if (err) return res.status(400).json(err);
			if (!author) return res.status(404).json();

			Course.findOne({id: req.body.id}, function (err, course) {
				if (err) return res.status(400).json(err);
				if (!course) return res.status(404).json();

				author.courses.push(course);
				author.save(function (err) {
					if (err) return res.status(500).json(err);

					res.status(201).json(author);
				});
			})
		});
	},


	deleteCourse: function (req, res, next) {
		Author.findOne({id: req.params.id}, function (err, author) {
			if (err) return res.status(400).json(err);
			if (!author) return res.status(404).json();

			// HACK TO CHANGE
			author.actors = [];
			author.save(function (err) {
				if (err) return res.status(400).json(err);

				res.status(204).json(author);
			})
		});
	}
};

