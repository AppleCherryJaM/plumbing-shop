const router = require('express').Router();
const {body} = require("express-validator");

const userController = require('../controllers/user-controller');
const authMiddleware = require("../middlewares/auth-middleware");

router.post('/registration',
	body("email").isEmail(),
	body("password").isLength({min: 4, max: 16}),
	userController.registration);
router.post('/login',
	body("email").isEmail(),
	body("password").isLength({ min: 4, max: 16 }),
	userController.login);
router.post('/logout', authMiddleware, userController.logout);

router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;