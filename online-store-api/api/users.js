var express = require('express');
var controller = require('../controllers/users');

var router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.post('/signup', controller.create);
router.post('/login', controller.authenticate);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
