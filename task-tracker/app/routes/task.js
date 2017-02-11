/**
 * Created by moksha on 11/02/17.
 */
/**
 * Created by moksha on 11/02/17.
 */
var express = require('express');
var taskRouter = express.Router();
var Task = require('../models/task'); // get our mongoose models
var User = require('../models/user'); // get our mongoose models


taskRouter.get('/', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.json(tasks);
  });
});


taskRouter.post('/', function (req, res) {
  var task = new Task({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.session.user,
    created: new Date(),
    status: 'NEW'
  });

  // save the sample user
  task.save(function (err) {
    if (err) throw err;

    console.log('Task saved successfully');
    res.json({success: true});
  });
});


module.exports = taskRouter;