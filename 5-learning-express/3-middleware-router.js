/**
 * Created by moksha on 11/02/17.
 */

/*
 A router object is an isolated instance of middleware and routes.
 You can think of it as a “mini-application,” capable only of performing middleware
 and routing functions. Every Express application has a built-in app router.

 Ref : http://expressjs.com/en/api.html#router

 */

var express = require('express');
var app = express();

var router = express.Router();

//debug middleware - print params for all requests
// NOTE : routeless
router.use(function (req, res, next) {
  console.log('Request Received @ :' + Date().toString());
  next();// without this - request goes into EVL trap - endless
})


router.get('/home', function (req, res) {
  res.send('im the home page!');
});


router.get('/about', function (req, res) {
  res.send('im the about page!');
});


app.use('/api', router);
app.use('/app', router);

var server = app.listen(3000, function (req, res) {
  console.log("Catch the action at http://localhost:3000");
});