const uuid = require("uuid");
const path = require("path");
const { Op, QueryTypes, where } = require("sequelize");

const ApiError = require("../exceptions/api-error");
const { Product, Category, ProductInfo, Exchange, Discount, CategoryBrand} = require('../models/db-models');
const getDay = require("../util/day-formula");
const priceFormula = require("../util/price-formula");
const productService = require("../services/product-service");

class ProductController {

	async createProduct(req, res, next) {
		const { 
			name, 
			categories, 
			retailPrice, 
			wholesalePrice, 
			brandId, 
			info, 
			totalQuantity 
		} = req.body;
		let result; 

		const images = req.files.images; // Mechanism for saving images in folder
		let files = [];
		if (images && images.length > 0) {
			images.forEach(image => {
				image.filename = uuid.v4() + ".jpg";
				files.push(image.filename);
				image.mv(path.resolve(
					__dirname, '..', `static`, image.filename
				));
			});
		}

		const parsedCategories = JSON.parse(categories);
		try {
			const candidate = await Product.findOne({ where: { name } });
			if (candidate) return next(ApiError.BadAPIRequest('Current product exists'));
			const candidateCategories = await Category.findAll({
				where: {
					id: {
						[Op.in]: parsedCategories
					}
				}
			});

			if (candidateCategories.length < parsedCategories.length) {
				return next(ApiError.SearchError({
					model: 'Category', 
					name: "Id", 
					value: JSON.stringify(candidateCategories)
				}));
			}

			const opt = wholesalePrice || retailPrice;

			const newObj = await Product.create({
				name, price, 
				wholesalePrice: opt, 
				images: files,
				brandId: brandId,
				totalQuantity: totalQuantity || 0
			});

			if (info) {
				const parsedInfo = JSON.parse(info);
				let productInfoArray = [];
				parsedInfo.forEach(i =>
					productInfoArray.push({
						title: i.title,
						description: i.description,
						productId: newObj.id
					})
				);
				ProductInfo.bulkCreate(productInfoArray);
			}

			const cbSearch = [] || await CategoryBrand.findAll({
				where: {
					brandId: newObj.brandId,
					categoryId: {
						[Op.in]: parsedCategories
					}
				}
			});

			let newCB = [];
			if (!cbSearch && cbSearch.length === 0) {
				for (let cId of parsedCategories) {
					newCB.push({ 
						categoryId: cId, 
						brandId: newObj.brandId, 
						productIdList: [newObj.id]
					});
				}
			} else if (cbSearch.length < parsedCategories.length) {
				parsedCategories.forEach(category => {
					let coincidence = 0;
					for (let cb of cbSearch) {
						if (cb.categoryId === category) {
							cb.productIdList.push(newObj.id);
							coincidence++;
						}
					}
					if (coincidence === 0) { 
						newCB.push({
							categoryId: category, 
							brandId: newObj.brandId,
							productIdList: [newObj.id]
						});
					} else {
						cbSearch.forEach(cb => {
							cb.productIdList.push(newObj.id);
						});
					}
				});
				
				if (newCB.length > 0){
					CategoryBrand.bulkCreate(newCB);
				} else {
					cbSearch.save();
				}
			} 
			
			result = await Product.findOne({
				where: {
					name: name
				},
				include: Category
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
		return res.status(201).json({ message: "Product created", result });
	}

	async getProducts(req, res, next) {
		const { brandId, cIds, currency } = req.body; // categoryIds = [id]
		const categoryIds = cIds ? JSON.parse(cIds) : undefined;

		try {
			const currentDay = getDay();
			const exchangeCourse = await Exchange.findOne({
				where: {
					updated_at: {
						[Op.substring]: currentDay
					}
				}
			});

			const currencyList = JSON.parse(exchangeCourse.currencyList);
			const keysList = Object.keys(currencyList);

			let exchangeAdapter = {};

			for (let key of keysList) {
				exchangeAdapter = {
					...exchangeAdapter, 
					key: (price) => price * currencyList[key]
				}
			}

			const products = await productService.getProducts(brandId, categoryIds);
			const discountList = await Discount.findAll();

			products.forEach(product => {
				if (product.priceCurrency !== currency) {
					product.retailPrice = exchangeAdapter[currency](product.retailPrice);
					product.wholesalePrice = exchangeAdapter[currency](product.wholesalePrice);
					product.discountRetailPrice = product.retailPrice;
				}
				for (let discount of discountList) {
					const cases = {
						brandCase: (discount.brandId !== null && product.brandId !== null) && discount.brandId === product.brandId,
						categoryCase: product.categoryIdList.includes(discount.categoryId),
						productCase: product.id === discount.productId
					}

					if (cases.brandCase || cases.productCase) {
						product.discountRetailPrice = priceFormula(product.retailPrice, discount.discountValue);
						break;
					}

					if (cases.categoryCase) {
						product.discountRetailPrice = priceFormula(product.retailPrice, discount.discountValue);
					}
				}
			});

			return res.status(200).json({result: products});
		} catch (error) {
			console.log(error);
			return next(error);			
		}
	}
	
	async searchProduct(req, res, next) {
		const { query } = req.params;
		try {
			const searchResult = await sequelize.query(`SELECT id, name, images FROM products WHERE name LIKE '${query}%'`);
			
			if (!searchResult) return next(ApiError.SearchError({ model: "Product", name: "name", value: query }));

			return res.status(200).json({ result: searchResult });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getProductById(req, res, next) {
		const { id } = req.params;
		try {
			const result = await Product.findByPk(id);

			if (!result) return next(ApiError.SearchError({ model: "Product", name: "id", value: id }));

			return res.status(200).json({result});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async updateProduct(req, res, next) {
		const { id } = req.params;
		const { price, wholesalePrice } = req.body;
		try {
			const updatedObject = await Product.findByPk(id);

			if (!updatedObject) return next(ApiError.SearchError({model: "Product", name:"id", value:id}));

			if ( price && wholesalePrice ) {
				updatedObject.price = price;
				updatedObject.wholesalePrice = wholesalePrice;
			}
			if (price && !wholesalePrice) {
				updatedObject.price = price;
			}
			if (!price && wholesalePrice) {
				updatedObject.wholesalePrice = wholesalePrice;
			}
			await updatedObject.save();
			return res.status(200).json({
				message: "Object updated.",
				updatedObject
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async deleteProduct(req, res, next){
		const {id} = req.params;
		try {
			const deletedObject = await Product.findByPk(id);

			if (!deletedObject) return next(ApiError.SearchError());

			await deletedObject.destroy();
			return res.status(200).json({ 
				message: `Product with id ${id} successfully deleted.`,
				deletedObject
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

}

module.exports = new ProductController();
