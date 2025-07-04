import productApi from "../http/productApi";

export default class ProductController {
	static async getProduct(productId) {
		return productApi.get(`/${productId}`);
	}

	static async getAllProducts() {
		return productApi.get('/');
	}

	static async getProductList(params) {
		return productApi.get();
	}
	
	
}