const ApiError = require("../exceptions/api-error");
const { User } = require("../models/db-models");

const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class UserService {
	async registration(email, password, phone, name, role) {
		const candidate = await User.findOne({
			where: { email, phone }
		});

		if (candidate) {
			throw ApiError.BadAPIRequest("The user with current email/phone exists");
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuidv4();
		const user = await User.create({
			email, password: hashPassword, phone, name, activationLink, role
		});

		await mailService.sendActivationLink(email,
			 `${process.env.API_URL}/api/user/activate/${activationLink}`
		);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		
		return {...tokens, user: userDto};
	}

	async activate(link) {
		const user = await User.findOne({
			where: {
				activationLink: link
			}
		});

		if (!user) {
			throw ApiError.SearchError({
				model: "User",
				name: "activationLink",
				value: link
			});
		}

		user.isActivated = true;
		await user.save();
	}

	async login(email, password) {
		const user = await User.findOne({
			where: {email}
		});
		
		if (!user) {
			throw ApiError.SearchError({
				model: "User",
				name: "email",
				value: email
			});
		}

		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadAPIRequest("Incorrect password");
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateToken(refreshToken, "refresh");
		const dbToken = await tokenService.findToken(refreshToken);
		if (!userData || !dbToken) {
			throw ApiError.UnauthorizedError();
		}

		const user = await User.findByPk(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
}

module.exports = new UserService();