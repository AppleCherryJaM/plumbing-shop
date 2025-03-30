const jwt = require('jsonwebtoken');

const { Token } = require("../models/db-models");

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(
			payload, 
			process.env.JWT_ACCESS_SECRET, 
			{expiresIn: '1m'}
		);
		const refreshToken = jwt.sign(
			payload, 
			process.env.JWT_REFRESH_SECRET, 
			{ expiresIn: '30d' }
		);
	
		// необходимо продумать возможность удалени токенов с "истекшим" сроком
		// для возможности наличия множества токенов у одного пользователя, 
		// дабы он мог заходить с разных устройств

		return {
			accessToken,
			refreshToken
		}
	}

	validateToken(token, envVarType) {
		try {

			if (envVarType !== "access" && envVarType !== "refresh") {
				return null;
			}

			const envVar = envVarType === "access" ?
				process.env.JWT_ACCESS_SECRET :
				process.env.JWT_REFRESH_SECRET;

			const userData = jwt.verify(token, envVar);
			return userData;
		} catch (error) {
			console.log("Validation token error", error);
			return null;
		}
	}

	async saveToken(userId, refreshToken) {
		const candidateToken = await Token.findOne({
			where: {
				user_id: userId
			}
		});

		if (candidateToken) {
			candidateToken.refreshToken = refreshToken;
			candidateToken.save();
			return candidateToken;
		}

		const token = await Token.create({
			user_id: userId,
			refreshToken
		});

		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await Token.destroy({
			where: {
				refreshToken
			}
		});
		return tokenData;
	}

	async findToken(refreshToken) {
		const tokenData = await Token.findOne({
			where: {
				refreshToken
			}
		});
		return tokenData;
	}
}

module.exports = new TokenService();