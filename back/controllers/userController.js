const db = require('../models/database/db');
const HttpError = require('../models/httpError');

const createUser = async(req, res, next) => {
	const {firstName, lastName, email, password, phone} = req.body;
	let newUser;
	console.log(req.body);
	try {
		newUser = await db.query(
			"INSERT INTO person (first_name, second_name, email, password, phone_number) VALUES ($1,$2,$3,$4,$5) RETURNING *",
			[firstName, lastName, email, password, phone]
		);
	} catch (error) {
		return next(
			new HttpError(
				error, 500
			)
		);
	}

	res.status(200).json(newUser.rows[0]);
}

exports.createUser = createUser;