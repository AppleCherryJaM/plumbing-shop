const ApiError = require("../exceptions/api-error");
const { Store, Product, ProductStore } = require("../models/db-models");

class StoreController {

	async createStore(req, res, next) {
		const { location } = req.body;
		try {
			const candidate = await Store.findOne({where: { location } });
			if (candidate) return next(new ApiError.BadAPIRequest("Store with current location is exists"));

			const newStore = await Store.create({
				location
			});

			return res.status(201).json({
				message: "Store created",
				store: newStore
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getStore(req, res, next) {
		const { id } = req.params;
		try {
			const store = await Store.findByPk(id);
			if (!store) return next(ApiError.SearchError({model: "Store", name: "id", value: id}));
			return res.status(200).json({ result: store });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getAllStores(req, res, next) {
		try {
			const stores = await Store.findAll();

			if (!stores && stores.length < 0) {
				return next(ApiError.BadAPIRequest("The Stores-table is empty"));
			}

			return res.status(200).json({ result: stores });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async addProductToStore(req, res, next) {
		const { sid } = req.params;
		const { products } = req.body; // product = { id, quantity }

		try {
			let productStore = [];
			products.forEach((product) => {
				productStore.push({
					product_id: product.id,
					product_quantity: product.quantity,
					store_id: sid
				});
			});
			await ProductStore.bulkCreate(productStore);
			return res.status(200).json({ message: 'Relation created', result: productStore });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getStoresWithCurrentProduct(req, res, next) {
		const { pid } = req.params;
		try {
			const searchResult = await Store.findAll({
				include: {
					model: ProductStore,
					where: {
						product_id: pid
					}
				}
			});
			console.log(searchResult);
			return res.status(200).json({ result: searchResult });
		} catch (error) {
			console.log(error);
			return next(error);
		} 
	}

	async deleteStore(req, res, next) {
		const { id } = req.params;
		try {
			const deletedStore = await Store.destroy({where: { id } });
			return res.status(200).json({
				message: `Store deleted`,
				deletedStore
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
}

module.exports = new StoreController();