const ApiError = require("../exceptions/api-error");
const { Order, OrderProduct, User } = require("../models/db-models");
const priceFormula = require("../util/priceFormula");

class OrderController {
	async createOrder(req, res, next) {
		const { userId, products, discountPercent, isOpened } = req.body; // products - array of objects with structure [{product_id, quantity, productPrice}]
		try {
			const buyer = await User.findByPk(userId);

			if (!buyer) return next(ApiError.SearchError("Cannot find current user"));

			let totalPrice;
			products.forEach(item => totalPrice += item.productPrice);
			totalPrice = priceFormula(totalPrice, discountPercent);
			let newOrder;
			if (isOpened) {
				newOrder = await Order.create({
					user_id: userId,
					price: totalPrice
				});
			} else {
				newOrder = await Order.create({
					user_id: userId,
					price: totalPrice,
					isOpened: false
				});
			}

			let orderProducts;
			products.forEach(item => {
				orderProducts.push({
					order_id: newOrder.id,
					product_id: item.productId,
					ordered_product_quantity: item.quantity,
					delivered_product_quantity: isOpened ? 0 : item.quantity
				});
			});

			await OrderProduct.bulkCreate(orderProducts);

			return res.status(201).json({ message: "Order created" });
		} catch (error) {
			console.log(error);
			return next(error)
		}
	}

	async getOrders(req, res, next) {
		const { userId, page, limit } = req.params;
		let orders;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		try {
			if (!userId) {
				orders = await Order.findAndCountAll({
					limit, offset
				});
			}
			if (userId) {
				orders = await Order.findAndCountAll({
					where: {
						user_id: userId
					}, limit, offset
				});
			}
			return res.status(200).json({result: orders});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async getOrderById(req, res, next) {
		const { id } = req.params;

		try {
			const order = await Order.findByPk(id);
			if (!order) return next(ApiError.SearchError("Cannot find current order"));
			return res.status(200).json({result: order});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	async deleteOrder(req, res, next) {
		const { id } = req.params;
		try {
			const deletedObject = await Order.findByPk(id);
			if (!deletedObject) return next(ApiError.SearchError("Cannot find current Order"));
			await deletedObject.destroy();
			return res.status(200).json({ message: `Order ${id} deleted` });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
}

module.exports = new OrderController;