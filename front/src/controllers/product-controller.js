import productApi from "../http/productApi";

export default class ProductController {
	static async getProduct(productId) {
		return productApi.get(`/${productId}`);
	}

	static async getAllProducts() {
		return productApi.get('/');
	}

	static async searchProduct(searchQuery) {
		return productApi.get('/search', {
			params: {
				query: searchQuery
			}
		});
	}

	static async getProductList(params) {
		const { brandId, cIds, currency } = params;
		return productApi.get('/', {
			params: {
				brandId: brandId,
				cIds: cIds,
				currency: currency
			}
		});
	}
	
	
}