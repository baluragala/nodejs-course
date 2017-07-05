let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let config = require('./config');

let app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});

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

/*app routes - START*/
app.use('/categories', require('./app/categories'));

/*app routes - END*/

/*api routes - START*/
app.use('/api/products', require('./api/products'));
app.use('/api/categories', require('./api/categories'));
app.use('/api/carts', require('./api/carts'));
app.use('/api/comments', require('./api/comments'));
app.use('/api/ratings', require('./api/ratings'));
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

/*api routes - END*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	console.log(req.url);
	console.log(err)

	if (req.url.includes('/api/') && err.status)
		res.status(err.status).json({status: err.status, message: err.inner.message});
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
