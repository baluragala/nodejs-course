var express = require('express');
var userRouter = express.Router();
var User = require('../models/user'); // get our mongoose models
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


userRouter.get('/', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

userRouter.post('/logout', function (req, res) {
  req.session.user = null;
  res.json({message: 'logged out'});
});

userRouter.post('/signup', function (req, res) {
  var user = new User({
    name: req.body.username,
    password: req.body.password,
    admin: true
  });

  // save the sample user
  user.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({success: true});
  });
});

userRouter.post('/login', function (req, res) {
// find the user
  User.findOne({
    name: req.body.username
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.status(403).json({success: false, message: 'Authentication failed. User does not exist.'});
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(403).json({success: false, message: 'Authentication failed. Incorrect password.'});
      } else {

        // if user is found and password is right
        // create a token

        var token = jwt.sign(user, req.app.get('secret'));
        //req.session.user = user;
        // return the information including token as JSON
        res.json({
          success: true,
          token: token
        });
      }

    }
  });
});

module.exports = userRouter;