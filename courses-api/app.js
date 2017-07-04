var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');
var authors = require('./routes/authors');

var app = express();

//attach datasource
require('./lib/db')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//courses routes
// 1. GET /courses
// 2. POST /courses

app.route('/courses')
	.get(courses.findAll)
	.post(courses.create);

// 1. GET /courses/:id
// 2. PUT /courses/:id
// 1. DELETE /courses/:id
app.route('/courses/:id')
	.get(courses.find)
	.put(courses.update)
	.delete(courses.delete);


app.get('/courses/:id/authors', courses.getAuthorsByCourseId);
app.post('/courses/:id/authors/:authorId', courses.addAuthor);
app.delete('/courses/:id/authors/:authorId', courses.deleteAuthor);


// Authors routes
app.route('/authors')
	.get(authors.findAll)
	.post(authors.create);

app.route('/authors/:id')
	.get(authors.find)
	.put(authors.update)
	.delete(authors.delete);

app.post('/authors/:id/courses', authors.addCourse);
app.delete('/authors/:id/courses/:courseId', authors.deleteCourse);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler - error middleware
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
