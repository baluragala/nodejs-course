var express = require('express');
var controller = require('../controllers/categories');

var router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', function (req, res, next) {
	Category.findOne({id: req.params.id})
		.then(function (categories) {
			res.status(200).json(categories)
		})
		.catch(function (err) {
			res.status(500).json(err)
		})
});
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
