const { Discount } = require("../models/db-models");
const { QueryTypes } = require("sequelize");

class DiscountController {
	async _searchDiscount(params) {
		const { brandId, productId, categoryId, terms } = params;
		let query = "SELECT * FROM Discount ";
		if ( brandId || productId || categoryId || terms ) {
			query += "WHERE ";
			if (brandId) query += `brandId LIKE ${brandId} `;
			if (productId) query += `productId LIKE ${productId} `;
			if (categoryId) query += `categoryId LIKE ${categoryId} `;
			if (terms) query += `terms LIKE ${terms} `; 
		}
		const searchResult = await sequelize.query(query, {
			type: QueryTypes.SELECT
		});
		
		return searchResult;
	}

	async createDiscount(req, res, next) {
		const { brandId, categoryId, productId, terms, discountValue } = req;
		let candidate, newDiscount;
		try {
			candidate = this._searchDiscount({ brandId, categoryId, productId, terms, });
			if (candidate) return next(ApiError.BadAPIRequest('Current discount exists'));
			newDiscount = await Discount.create({
				brandId,
				categoryId,
				productId,
				terms,
				discountValue
			});
			return res.status(201).json({
				message: `Discount for brand ${brandId} category ${categoryId} created`
			});
		} catch (error) {
			return next(error);			
		}
	}

	async getDiscountList(req, res, next) {
		const {brandId, categoryId, productId, terms} = req;
		try {
			const searchResult = await this._searchDiscount({ 
				brandId, 
				categoryId, 
				productId, 
				terms 
			});
			return res.status(200).json({
				result: searchResult
			});	
		} catch (error) {
			return next(error);
		}
	}

	async getDiscountById(req, res, next) {
		const { id } = req;
		try {
			const result = await Discount.findByPk(id);
			return res.status(200).json({ result });
		} catch (error) {
			return next(error);
		}
	}

	async deleteDiscount(req, res, next) {
		const { id } = req;
		try {
			const deletedDiscount = await Discount.destroy({
				where: { id }
			});
			return res.status(200).json({
				message: `Discount with id: ${id} successfully deleted`,
				deletedObject: deletedDiscount
			});
		} catch (error) {
			return next(error);
		}
	}

	async scheduledDeleteDiscount(time) {
		const destroyedDiscounts = await Discount.destroy({
			where: {
				to: time
			}
		});
		return {
			message: "Successful deleted discounts",
			destroyedDiscounts
		};
	}
}

module.exports = new DiscountController();