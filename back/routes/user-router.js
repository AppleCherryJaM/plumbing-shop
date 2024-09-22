const router = require('express').Router();

const userController = require('../controllers/user-controller');
const authMiddleware = require("../middlewares/auth-middleware");

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check)

router.delete('/:id', userController.deleteUser);
//router.get('/userList', userController.getAllUsers);

// router.patch();


module.exports = router;