const { Product, CategoryBrand } = require("../models/db-models");

class ProductService {
	async _getCbByCategories(categoryIds) {
		let productIds = new Set(), cbList = [];
		cbList = await CategoryBrand.findAll({
			where: {
				categoryId: {
					[Op.in]: categoryIds
				}
			}
		});

		cbList.forEach(item => {
			item.productIdList.forEach(pid => productIds.add(pid));
		});
		return { cbList, productIds };
	}

	async getProducts(brandId, categoryIds) {
		let products = [], cbList = [], productIds = new Set();
		if (!brandId && !categoryIds) {
			products = await Product.findAll();
			cbList = await CategoryBrand.findAll();
		} else if (brandId && !categoryIds) {
			products = await Product.findAll({
				where: {
					brandId: brandId
				}
			});
			cbList = await CategoryBrand.findAll({
				where: {
					brandId
				}
			});
		} else if (!brandId && categoryIds && categoryIds.length > 0) {
			const funcRes = await this._getCbByCategories(categoryIds);
			
			cbList = funcRes.cbList;
			productIds = funcRes.productIds;

			products = await Product.findAll({
				where: {
					id: {
						[Op.in]: productIds
					}
				}
			});
		} else {
			const funcRes = await this._getCbByCategories(categoryIds);

			cbList = funcRes.cbList;
			productIds = funcRes.productIds;

			products = await Product.findAll({
				where: {
					brandId: brandId,
					id: {
						[Op.in]: productIds
					}
				}
			});
		}
		products.forEach(product => {
			product.categoryIdList = new Set();
			cbList.forEach(cb => {
				if (cb.productIdList.includes(product.id)) {
					product.categoryIdList.add(cb.categoryId);
				}
			});
		});
		return products;
	}
}

module.exports = new ProductService();