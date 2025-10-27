const { Brand, CategoryBrand, Exchange, Product, Discount, Category } = require("../models/db-models");

class CreationService {
	async createCategories(categories) {

	}

	async createBrands(brands) {
		
	}

	async createProducts(products) {

	}

	static async bulkCreate(jsonData) {
		let categories = [];
		let brands = [];
		let products = [];
		if (jsonData.categories){
			
		}
	} 
}

module.exports = CreationService;