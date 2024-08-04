const router = require('express').Router();

const userController = require('../controllers/userController');

router.post('/new', userController.createUser);

module.exports = router;