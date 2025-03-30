const ApiError = require("../exceptions/api-error");
const {Brand, CategoryBrand, Exchange, Product, Discount} = require("../models/db-models");

class BrandController {

	async _getBrandsExchangeCourse(brands) {
		try {
			brandIdList = [];
				brands.forEach(brand => {
					if (!brandIdList.includes(brand.id)) {
						brandIdList.push(brand.id);
					}
				});
				if (brandIdList.length > 0) {
					const exchangeCourseList = Exchange.findAll({
						where: {
							[Op.in]: brandIdList
						}
					});
					if (exchangeCourseList.length > 0) {
						brands.forEach(brand => {
							for (let item of exchangeCourseList) {
								if (item.brandId === brand.id) {
									brand.exchangeCourse = item.currencyList
								}
							}
						})
					}
				}
		} catch (error) {
			return error;
		}
		return brands;
	} 

	async createBrand(req, res, next) {
		const { name } = req.body;
		try {
			const brand = await Brand.create({name});
			return res.status(201).json({
				message: `Brand ${name} successfully created`,
				object: brand
			});	
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getBrandList(req, res, next) { 
		try {
			let brands = await Brand.findAll();
			const cbList = await CategoryBrand.findAll();
			if (!brands || brands.length === 0) {4
				throw ApiError.SearchError({model: "Brand"});
			}
			brands = await this._getBrandsExchangeCourse(brands);
			brands.forEach(brand => {
				for(let cb of cbList) {
					if (brand.id === cb.brandId) {
						brand.categories.push(cb.categoryId);
					}
				}
			});
			return res.status(200).json({result: brands});
		} catch (error) {
			return next(error);
		}
	}

	async getBrandById(req, res, next) {
		const { id } = req.params;
		try {
			const searchResult = await Brand.findByPk(id);
			const cbList = await CategoryBrand.findAll({
				where: {
					brandId: id
				}
			});
			if (searchResult === null) {
				throw ApiError.SearchError();
			}
			let result = await this._getBrandsExchangeCourse(searchResult);
			result.categories = [];
			cbList.forEach(item => {
				result.categories.push(item.categoryId);
			});
			return res.status(200).json({result: result});
		} catch (error) {
			return next(error);
		}
	}

	async deleteBrand(req, res, next) {
		const { id } = req.params;
		try {
			const deletedExchangeCourse = await Exchange.destroy({
				where: {
					brandId: id
				}
			});
			const deletedProducts = await Product.destroy({
				where: {
					brandId: id
				}
			});
			const deletedCB = await CategoryBrand.destroy({
				where: {
					brandId: id
				}
			});
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