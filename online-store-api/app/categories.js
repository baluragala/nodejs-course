var express = require('express');
var Category = require('../models/category');

var router = express.Router();

router.get('/', function (req, res) {
	Category
		.find()
		.then(function (categories) {
			res.render('cart/index', {categories: categories})
		})
});

router.get('/add', function (req, res) {
	res.render('category/add')
});

router.post('/add', function (req, res) {
	console.log(req.body);
	Category
		.create(req.body)
		.then(function (category) {
			console.log(category);
			res.redirect('/categories')
		})
		.catch(function (err) {
			console.log(err);
			res.status(500).json(err);
		})
});


module.exports = router;
