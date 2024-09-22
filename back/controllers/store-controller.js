const ApiError = require("../exceptions/api-error");
const { Store, Product, ProductStore } = require("../models/db-models");

class StoreController {

	async createStore(req, res, next) {
		const { location } = req.body;
		let newStore;
		try {
			const candidate = await Store.findOne({where: { location } });

			if (candidate) return next(new ApiError.BadAPIRequest("Store with current location is exists"));

			newStore = await Store.create({
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
		let store;
		try {
			store = await Store.findByPk(id);
			if (!store) return next(ApiError.BadAPIRequest("Cannot find store with current id"));
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
				return next(ApiError.BadAPIRequest());
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
			products.foreach(async (product) => {
				await ProductStore.create({
					product_id: product.id,
					product_quantity: product.quantity,
					store_id: sid
				});
			});
		} catch (error) {
			console.log(error);
			return next(error);
		} finally {
			console.log("Created");
			return res.status(200).json({ message: 'Relation created' });
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
				message: `Store deleted`
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
}

module.exports = new StoreController();