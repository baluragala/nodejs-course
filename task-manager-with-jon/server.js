/**
 * Created by moksha on 11/02/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var userRoute = require('./app/routes/user');
var config = require('./config');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');

var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.set('secret', config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({secret: config.secret}));
app.use(express.static('public'));
app.use(express.static('public1'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/jade', function (req, res) {
  res.render('index', {data: 'this is a data to template', tasks: [{title: 'task1'}, {title: 'task2'}]});
});

app.use('/api/1/users', userRoute);

app.listen(port, function () {
  console.log('App is running at http://localhost:' + port);
});