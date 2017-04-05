var Course = require('../models/course');
var Author = require('../models/author');
var mongoose = require('mongoose');

module.exports = {

  findAll: function (req, res, next) {
    Course.find(function (err, courses) {
      if (err) return res.status(400).json(err);

      res.status(200).json(courses);
    });
  },


  create: function (req, res, next) {
    Course.create(req.body, function (err, course) {
      if (err) return res.status(400).json(err);

      res.status(201).json(course);
    });
  },


  find: function (req, res, next) {
    Course.findOne({id: req.params.id})
      .populate('authors')
      .exec(function (err, course) {
        if (err) return res.status(400).json(err);
        if (!course) return res.status(404).json();

        res.status(200).json(course);
      });
  },


  update: function (req, res, next) {
    Course.findOneAndUpdate({id: req.params.id}, req.body, function (err, course) {
      if (err) return res.status(400).json(err);
      if (!course) return res.status(404).json();

      res.status(200).json(course);
    });
  },


  delete: function (req, res, next) {
    Course.findOneAndRemove({id: req.params.id}, function (err) {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  },


  addAuthor: function (req, res, next) {
    Course.findOne({id: req.params.id}, function (err, course) {
      if (err) return res.status(400).json(err);
      if (!course) return res.status(404).json();

      Author.findOne({id: req.params.authorId}, function (err, author) {
        if (err) return res.status(400).json(err);
        if (!author) return res.status(404).json();

        course.authors.push(author);
        course.save(function (err) {
          if (err) return res.status(500).json(err);

          res.status(201).json(course);
        });
      })
    });
  },


  deleteAuthor: function (req, res, next) {
    Course.findOne({id: req.params.id}, function (err, course) {
      if (err) return res.status(400).json(err);
      if (!course) return res.status(404).json();

      // HACK TO CHANGE
      course.authors = [];
      course.save(function (err) {
        if (err) return res.status(400).json(err);

        res.status(204).json(course);
      })
    });
  },

  getAuthorsByCourseId: function (req, res, next) {
    Course.findOne({id: req.params.id}, function (err, course) {
      if (err) return res.status(400).json(err);
      if (!course) return res.status(404).json();

      Author.find({
        '_id': {
          $in: course.authors.map(function (authorId) {
            return mongoose.Types.ObjectId(authorId)
          })
        }
      }, function (err, authors) {
        res.json(authors);
      })

    });
  }


};
