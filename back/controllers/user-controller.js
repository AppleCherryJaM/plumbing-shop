const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ApiError = require('../exceptions/api-error');
const { User, Order } = require('../models/db-models');

const generateJwt = (id, email, role) => {
	return jwt.sign(
		{ id, email, role },
		process.env.JWT_ACCESS_SECRET,
		{ expiresIn: '24h' }
	)
}

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) {
			return next(ApiError.BadAPIRequest('Incorrect email or password'));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(ApiError.BadAPIRequest('User with current email is already registered'));
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ email, role, password: hashPassword });
		// const order = await Order.create({ user_id: user.id });
		const token = generateJwt(user.id, user.email, user.role);
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return next(ApiError.BadAPIRequest('User does not found'));
		}
		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return next(ApiError.BadAPIRequest('Incorrect password'));
		}
		const token = generateJwt(user.id, user.email, user.role);
		return res.json({ token });
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role);
		return res.json({ token });
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