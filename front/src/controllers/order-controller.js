import orderApi from "../http/orderApi";

export default class OrderController {
	static async getOrder(orderId) {
		return orderApi.get(`/${orderId}`);
	}

	static async getUserOrders(params) { 
		//params = { dateParams, orderStatus, isStatusFilterSelected, userId }
		//userId is required field for usual user
		
		return orderApi.get('/orders', {
			params: params
		});
	}

	//static async deleteOrder() {}

	static async createOrder({ userId, products, deliveryInfo, discountPercent, isWholesale}) {
		// products = [product]
		// deliveryInfo = {departureStoreId, destinationStoreId}
		// product = { product_id, quantity, deliveredQuantity, productPrice }

		const { destinationStoreId, departureStoreId } = deliveryInfo;

		return orderApi.post('/new', {
			userId,
			products,
			discountPercent,
			departureStoreId,
			destinationStoreId,
			isWholesale
		});
	}
}