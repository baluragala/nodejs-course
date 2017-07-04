var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});


router.get('/loops', function (req, res) {
	let fruits = ['apple', 'banna', 'chikku', 'dragon fruit'];
	res.render('fruits', {fruits});
});

router.get('/interpolation', function (req, res) {
	res.render('interpolation', {username: 'Zeolearn'});
});

router.get('/case', function (req, res) {
	res.render('case', {subscription: 'FREE'});
});

router.get('/conditionals', function (req, res) {
	res.render('conditionals', {});
});

module.exports = router;
