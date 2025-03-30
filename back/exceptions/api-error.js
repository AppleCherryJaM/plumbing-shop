module.exports = class ApiError extends Error {
	constructor(code, message, errors = []) {
		super(message);
		this.code = code;
		this.errors = errors
	}

	static BadAPIRequest(message, errors = []) {
		return new ApiError(500, message, errors);
	}

	static UnauthorizedError() {
		return new ApiError(401, 'User is unauthorized.');
	}

	static Forbidden() {
		return new ApiError(403, "User does not have sufficient rights to access the requested resource.");
	}

	static SearchError(param) {
		return new ApiError(404, `Cannot find ${param.model} with current ${param.name}: ${param.value}.`);
	}
	
}