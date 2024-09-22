const ApiError = require("../exceptions/api-error");
const {Brand, CategoryBrand, Product, Category} = require("../models/db-models");

class BrandController {
	async createBrand(req, res, next) {
		const { name } = req.body;
		try {
			const brand = await Brand.create({name});
			return res.status(201).json({
				message: `Brand ${brand} successfully created`,
				object: brand
			});	
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getBrandList(req, res, next) {
		try {
			const brands = await Brand.findAll();
			if (!brands && brands.length === 0) {
				throw ApiError.SearchError();
			}
			return res.status(200).json({result: brands});
		} catch (error) {
			return next(error);
		}
	}

	async getBrandById(req, res, next) {
		const { id } = req.params;
		try {
			const searchResult = await Brand.findByPk(id);
			if (searchResult === null) {
				throw ApiError.SearchError();
			}
			return res.status(200).json({result: searchResult});
		} catch (error) {
			return next(error);
		}
	}

	async updateBrandProductsDiscount(req, res, next) {
		const { id } = req.params;
		const { categories } = req.body; // categories = [{ categoryId, discountPercent }]
		let promises = [], categoryIds = [];
		try {
			const brandCategories = await CategoryBrand.findAll({
				where: {
					brandId: id
				}
			});
			brandCategories.forEach(item => {
				categoryIds.push(item.categoryId);
				for (let category of categories) {
					if (category.id === item.categoryId) {
						promises.push(
							CategoryBrand.update(
								{ discountPercent: category.discountPercent },
								{ where: { brandId: id } }
							)
						);
					}
				}
			});

			Promise.all(promises).then(() => {
				console.log("Success");
			});

			return res.status(200).json({
				result: { message: `Discount percents updated` } 
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async deleteBrand(req, res, next) {
		const { id } = req.params;
		try {
			const deletedBrand = await Brand.destroy({
				where: {
					id: id
				}
			});
			res.status(200).json({message: `Object (brand) with id ${id} successfully deleted.`, deletedObject: deletedBrand});
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new BrandController();