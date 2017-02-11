/**
 * Created by moksha on 04/02/17.
 */

// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // th
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var userRoute = require('./app/routes/user');
var taskRoute = require('./app/routes/task');

var Task = require('./app/models/task'); // get our mongoose models

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('secret', config.secret); // secret variable
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({secret: config.secret}));

// use morgan to log requests to the console
app.use(morgan('dev'));



/*authorize request*/

app.use(function (req, res, next) {
  console.log(req.url);
  if (req.url == '/api/users/auth') {
    next();
    return;
  }

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.status(403).json({success: false, message: 'Invalid token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'Token required'
    });

  }
});

app.get('/tasks', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.render('tasks', {tasks: tasks});
  });
});

app.get('/add-task', function (req, res) {
  res.render('add-task', {token: req.body.token});
});

app.post('/add-task', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.redirect('/tasks');
  });
});

app.get('/login', function (req, res) {
  res.render('login', {token: req.body.token});
});

/**/


// =======================
// routes ================
// =======================
// basic route


// API ROUTES -------------------
// we'll get to these in a second
app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Task Manager Server Runs at http://localhost:' + port);

/*
 const Express = require('express');
 const path = require('path');
 const App = new Express();
 const PORT = process.env.PORT || 8080;

 App.use(Express.static('public'));

 App.get('/', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
 });

 App.get('/tasks', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'pages', 'tasks.html'));
 });

 App.get('/add-task', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'pages', 'add-task.html'));
 });

 App.get('/task-detail/:id', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'pages', 'task-detail.html'));
 });

 App.listen(PORT, function (req, res) {
 console.log(`server is up and running at http://localhost:${PORT}`);
 });*/
