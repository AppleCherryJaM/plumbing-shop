const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator');

const ApiError = require('../exceptions/api-error');
const { User } = require('../models/db-models');
const userService = require("../services/user-service");

const generateJwt = (id, email, role) => {
	return jwt.sign(
		{ id, email, role },
		process.env.JWT_ACCESS_SECRET,
		{ expiresIn: '24h' }
	)
}

class UserController {
	async registration(req, res, next) {
		try {
			const { email, phone, name, password, role } = req.body;

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadAPIRequest('Incorrect email or password'));
			}

			const userData = await userService.registration(email, password, phone, name);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30*24*60*60*1000, 
				httpOnly: true
			});
			return res.json(userData);
		} catch (error) {
			return next(error);			
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);

			return res.redirect(process.env.CLIENT_URL);
		} catch (error) {
			return next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const userData = await userService.login(email, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return res.json(userData);
		} catch (error) {
			return next(error);
		}

	}

	// async check(req, res, next) {
	// 	const token = generateJwt(req.user.id, req.user.email, req.user.role);
	// 	return res.json({ token });
	// }

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const userData = await userService.refresh(refreshToken);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return res.json(userData);

		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req, res, next){
		const { id } = req.params;
		try {
			const user = await User.findByPk(id);
			if (!user){
				return next(ApiError.SearchError({
					model: 'User', name: "Id", value: id 
				}));
			}

			user.destroy();
			res.status(200).json({ message: "User deleted" });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
}

module.exports = new UserController();