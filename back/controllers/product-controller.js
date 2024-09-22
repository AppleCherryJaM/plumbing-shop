const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");

const ApiError = require("../exceptions/api-error");
const { Product, Category, ProductInfo, Brand, CategoryBrand, Exchange, CategoryProduct } = require('../models/db-models');
const getDay = require("../util/day-formula");
const priceFormula = require("../util/priceFormula");

class ProductController {

	async createProduct(req, res, next) {
		const { name, categories, price, optPrice, brandId, info } = req.body; // !!!categories should be list of categoryId
		let result; 

		const images = req.files.images;
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
		try {
			const candidate = await Product.findOne({ where: { name } });
			console.log("Candidate: ", candidate );
			if (candidate) return next(ApiError.BadAPIRequest('Current product exists'));
			const candidateCategories = await Category.findAll({
				where: {
					id: {
						[Op.in]: JSON.parse(categories)
					}
				}
			});

			if (candidateCategories.length < JSON.parse(categories).length) return next(ApiError.SearchError({
				model: 'Category', 
				name: "Id", 
				value: JSON.stringify(candidateCategories)
			}));

			const opt = optPrice || price;

			const newObj = await Product.create({
				name, price, 
				optPrice: opt, 
				images: files,
				brandId: brandId
			});
			await newObj.addCategory(candidateCategories);

			if (info) {
				const parsedInfo = JSON.parse(info);
				parsedInfo.forEach(i =>
					ProductInfo.create({
						title: i.title,
						description: i.description,
						productId: newObj.id
					})
				);
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
		const { brandId, cIds } = req.query; // categoryIds = [id]
		let categoryIds = cIds ? JSON.parse(cIds) : undefined;
		let products, categoryBrands, categoryProducts;

		try {
			const currentDay = getDay();
			const exchangeCourse = await Exchange.findOne({
				where: {
					updated_at: {
						[Op.substring]: currentDay
					}
				}
			});
			console.log("Course: ", exchangeCourse);

			const exchangeAdapter = {
				USD: (price) => price * exchangeCourse.USD,
				EUR: (price) => price * exchangeCourse.EUR
			};

			if (!brandId && !categoryIds) {
				products = await Product.findAll();
				categoryBrands = await CategoryBrand.findAll();
			} else if (brandId && !categoryIds) {
				products = await Product.findAll({
					where: {
						brandId: brandId
					}
				});
				categoryBrands = await CategoryBrand.findAll({
					where: {
						brandId: brandId
					}
				});
			} else if (!brandId && categoryIds && categoryIds.length > 0) {
				let productIds = [];
				console.log("Categories: ", categoryIds);
				categoryProducts = await CategoryProduct.findAll({ where: { categoryId: categoryIds } });

				console.log("CP: ", categoryProducts);

				categoryProducts.forEach(item => {
					if (!productIds.includes(item.productId)) {
						productIds.push(item.productId);
					}
				});
				products = await Product.findAll({
					where: {
						id: {
							[Op.in]: productIds
						}
					}
				});
				categoryBrands = await CategoryBrand.findAll({
					where: {
						categoryId: { [Op.in]: categoryIds }
					}
				});
			} else {
				let productIds = [];
				categoryProducts = await CategoryProduct.findAll({ where: { id: { [Op.in]: categoryIds } } });
				categoryProducts.forEach(item => {
					if (!productIds.includes(item.productId)) {
						productIds.push(item.productId);
					}
				});
				products = await Product.findAll({
					where: {
						brandId: brandId,
						id: {
							[Op.in]: productIds
						}
					}
				});
				categoryBrands = await CategoryBrand.findAll({
					where: {
						brandId: brandId,
						categoryId: {[Op.in]: categoryIds}
					}
				});
			}
			console.log('Products: ', products);
			products.forEach(product => {
				product.price = exchangeAdapter[product.priceCurrency];

				for (cb of categoryBrands) {
					if (cb.discountPercent !== 0) {
						if (product.priceCurrency !== "UAH" && cb.categoryId === product.categoryId && cb.brandId === product.brandId) {
							product.price = priceFormula(product.price, cb.discountPercent);
							product.priceCurrency = 'UAH';
						}
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
		const { search } = req.params;
		try {
			const searchResult = await sequelize.query(`SELECT id, name, images FROM products WHERE name LIKE '${search}%'`);
			
			if (!searchResult) return next(ApiError.SearchError());

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

			if (!result) return next(ApiError.SearchError());

			return res.status(200).json({result});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async updateProduct(req, res, next) {
		const { id } = req.params;
		const { price, optPrice } = req.body;
		try {
			const updatedObject = await Product.findByPk(id);

			if (!updatedObject) return next(ApiError.SearchError());

			if ( price && optPrice ) {
				updatedObject.price = price;
				updatedObject.opt_price = optPrice;
			}
			if (price && !optPrice) {
				updatedObject.price = price;
			}
			if (!price && optPrice) {
				updatedObject.opt_price = optPrice;
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

	async updateProductPriceByBrandId(req, res, next) {
		const { brandId } = req.params;
		const { price, optPrice } = req.body;
		let updatedObjects;
		try {
			if (!price && !optPrice) return next(new ApiError(422, "Cannot find price fields in request body."));

			if (price && !optPrice) {
				updatedObjects = await Product.update({
					price: price
				}, {
					where: {
						brand: brandId
					}
				});
			}
			if (!price && optPrice) {
				updatedObjects = await Product.update({
					opt_price: optPrice
				}, {
					where: {
						brand: brandId
					}
				});
			}
			if (price && optPrice) {
				updatedObjects = await Product.update({
					price: price, 
					opt_price: optPrice
				}, {
					where: {
						brand: brandId
					}
				});
			}

			return res.status(200).json({ message: "Products updated.", result: updatedObjects });
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
