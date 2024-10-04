const sequelize = require("sequelize");

const {Category, Product} = require("../models/db-models");
const ApiError = require("../exceptions/api-error");

class CategoryController{

	async createCategory(req, res, next) {
		const { name, parent, currencyCourse } = req.body;
		try {
			let category;
			if (!parent) {
				category = await Category.create({ name, currencyExchange: JSON.stringify(currencyCourse) });
			} else {
				category = await Category.create({ name, parentId: parent, currencyExchange: JSON.stringify(currencyCourse) });
			}
			return res.status(201).json({
				message: `Category ${name} successfully created`,
				object: category
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getCategoryList(req, res, next) {
		try {
			const categories = await Category.findAll();
			if (!categories && categories.length === 0) {
				throw ApiError.SearchError();
			}
			return res.status(200).json({ result: categories });
		} catch (error) {
			return next(error);
		}
	}

	async getCategoryById(req, res, next) {
		const { id } = req.params;
		try {
			const searchResult = await Category.findByPk(id);
			if (searchResult === null) {
				throw ApiError.SearchError();
			}
			return res.status(200).json({ result: searchResult });
		} catch (error) {
			return next(error);
		}
	}

	async deleteCategory(req, res, next) {
		const { id } = req.params;
		try {
			const deletedCategory = await Category.destroy({
				where: {
					id: id
				}
			});
			res.status(200).json({ message: `Object (category) with id ${id} successfully deleted.`, object: deletedCategory });
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new CategoryController();