var express = require('express');
var controller = require('../controllers/products');

var router = express.Router();

router.get('/', controller.findAll);
router.get('/category', controller.findWithCategory);
router.get('/category/:categoryId', controller.findAllByCategory);
router.get('/comments', controller.findWithComments);
router.get('/ratings', controller.findWithRatings);
router.get('/:id', controller.findById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
