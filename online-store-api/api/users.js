let express = require('express');
let controller = require('../controllers/users');
let auth = require('../auth/helper');

let router = express.Router();

router.get('/', auth.hasRole('ADMIN'), controller.findAll);
router.get('/:id', auth.isAuthenticated(), controller.findById);
router.post('/signup', controller.create);
router.post('/login', controller.authenticate);
router.put('/:id', auth.isAuthenticated, controller.update);
router.delete('/:id', auth.hasRole('ADMIN'), controller.delete);

module.exports = router;
