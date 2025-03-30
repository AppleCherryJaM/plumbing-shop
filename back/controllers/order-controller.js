const ApiError = require("../exceptions/api-error");
const { Order, ProductOrder, OrderStore, User, ProductStore } = require("../models/db-models");
const orderService = require("../services/order-service");
const priceFormula = require("../util/price-formula");
const getDay = require("../util/day-formula");
const { Op } = require("sequelize");

class OrderController {
	async createOrder(req, res, next) {
		const { 
			userId, 
			products, 
			discountPercent,  
			departureStoreId, 
			destinationStoreId,
			isWholesale
		} = req.body; 
		let { isOpened } = req.body;
		// products - array of objects with structure
		// [{product_id, quantity, deliveredQuantity, productPrice}]
	
		// isOpened - status of the order. 
		// If products specified in order aren't delivered to 
		// the customer - the order's status isOpened
		try {
			const buyer = await User.findByPk(userId);

			if (!buyer) return next(ApiError.SearchError({
				model: 'User', 
				name: "id", 
				value: userId
			}));

			let totalPrice, productOrders = [];

			const productStore = await ProductStore.findAll({
				where: {
					storeId: departureStoreId
				}
			});

			products.forEach(item => {
				totalPrice += item.productPrice

				productOrders.push({
					order_id: newOrder.id,
					product_id: item.productId,
					ordered_product_quantity: item.quantity,
					delivered_product_quantity: isOpened ? item.deliveredQuantity : item.quantity
				});

				if (!isOpened) {
					// productIds.push(item.productId);
					for (ps of productStore) {
						if (item.productId === ps.product_id) {
							isOpened = ps.product_quantity >= item.quantity;
							ps.product_quantity -= item.quantity;
						}
					}
				}
			});

			totalPrice = isWholesale && priceFormula(totalPrice, discountPercent);

			const newOrder = await Order.create({
				user_id: userId,
				price: totalPrice,
				isOpened: isOpened,
				created_at: getDay(true)
			});

			await ProductOrder.bulkCreate(productOrders);

			await productStore.save();

			if (destinationStoreId) {
				const destinationPS = await ProductStore.findAll({
					where: {
						store_id: destinationStoreId
					}
				});
				products.forEach(item => {
					destinationPS.forEach(ps => {
						if (item.productId === ps.product_id) {
							ps.product_quantity += item.quantity;
						}
					})
				});

				await destinationPS.save();
			}
		
			return res.status(201).json({ 
				message: "Order created", 
				result: newOrder 
			});
		} catch (error) {
			console.log(error);
			return next(error)
		}
	}

	async getOrders(req, res, next) { //include order-service
		const { dateParams, orderStatus, isStatusFilterSelected, userId } = req.params;
		let result;
		try {
			result = await orderService.getOrderList({ 
				dateParams, 
				orderStatus, 
				isStatusFilterSelected, 
				userId 
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
		console.log("Result: ", result);
		return res.status(200).json({ result });
	}

	async getOrderById(req, res, next) {
		const { id } = req.params;
		try {
			const order = await Order.findByPk(id);
			if (!order) return next(ApiError.SearchError({
				model: "Order",
				name: "id",
				value: id
			}));
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
			if (!deletedObject) return next(ApiError.SearchError({
				model: "Order", 
				name: "id", 
				value: id
			}));
			await deletedObject.destroy();
			return res.status(200).json({ message: `Order ${id} deleted` });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
}

module.exports = new OrderController;