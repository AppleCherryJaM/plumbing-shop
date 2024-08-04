const db = require('../models/db');
const httpError = require("../models/httpError");

//add validation
const createProduct = (req, res, next) => {
	const { name, category, price, opPrice } = req.body;
	
}

