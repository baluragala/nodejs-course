var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user'); // get our mongoose model
var config = require('../config'); // get our config file

mongoose.connect(config.database); // connect to database
var jwt = require('jsonwebtoken');

var router = express.Router();

router.get('/', function (req, res) {
	User.find({}, function (err, users) {
		res.json(users);
	});
});

router.get('/create-test-user', function (req, res) {

	// create a sample user
	var user = new User({
		name: 'zeo',
		password: 'zeo123',
		admin: true
	});

	// save the sample user
	user.save(function (err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({success: true});
	});
});


router.post('/authenticate', function (req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function (err, user) {

		if (err) throw err;

		if (!user) {
			res.json({success: false, message: 'Authentication failed. User not found.'});
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({success: false, message: 'Authentication failed. Wrong password.'});
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, config.jwtsecret);

				// return the information including token as JSON
				res.json({
					success: true,
					token: token
				});
			}

		}

	});
});

module.exports = router;
