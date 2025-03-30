
const ApiError = require('../exceptions/api-error');

module.exports = function (error, req, res, next) {

	if (res.headerSent) {
		return next(error);
	}
	console.log("Error: ", error);
	res.status(error.code || 500)
	res.json({ message: error || "Unknown error" })
	return res;
}