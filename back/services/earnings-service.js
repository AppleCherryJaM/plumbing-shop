const { Order, ProductOrder, Product, Sequelize } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../database/db');

class EarningsService {

	// Основной метод расчета заработка за период
	static async getEarningsForPeriod(startDate, endDate, options = {}) {
		try {
			const {
				groupBy = 'day', // 'day', 'month', 'year', 'none'
				includeDetails = false,
				isOpened = false // если есть статусы заказов
			} = options;

			const whereClause = {
				created_at: {
					[Op.between]: [startDate, endDate]
				}
			};

			// Добавляем фильтр по статусу, если нужно
			if (isOpened) {
				whereClause.isOpened = isOpened;
			}

			// Если нужна группировка по времени
			if (groupBy !== 'none') {
				return await this.getGroupedEarnings(startDate, endDate, groupBy, whereClause);
			}

			// Простая сумма за период
			const totalEarnings = await Order.sum('price', {
				where: whereClause
			});

			const orderCount = await Order.count({
				where: whereClause
			});

			const result = {
				period: { startDate, endDate },
				totalEarnings: totalEarnings || 0,
				orderCount,
				currency: 'USD' // или другая валюта из настроек
			};

			// Если нужна детальная информация
			if (includeDetails) {
				result.details = await this.getEarningsDetails(startDate, endDate, whereClause);
			}

			return result;

		} catch (error) {
			console.error('Error calculating earnings:', error);
			throw new Error('Failed to calculate earnings');
		}
	}

	// Группировка по периодам
	static async getGroupedEarnings(startDate, endDate, groupBy, whereClause) {
		let groupField;

		switch (groupBy) {
			case 'day':
				groupField = sequelize.fn('DATE', sequelize.col('created_at'));
				break;
			case 'month':
				groupField = sequelize.fn('DATE_TRUNC', 'month', sequelize.col('created_at'));
				break;
			case 'year':
				groupField = sequelize.fn('DATE_TRUNC', 'year', sequelize.col('created_at'));
				break;
			default:
				groupField = sequelize.fn('DATE', sequelize.col('created_at'));
		}

		const results = await Order.findAll({
			attributes: [
				[groupField, 'period'],
				[sequelize.fn('SUM', sequelize.col('price')), 'earnings'],
				[sequelize.fn('COUNT', sequelize.col('id')), 'orderCount']
			],
			where: whereClause,
			group: ['period'],
			order: [['period', 'ASC']],
			raw: true
		});

		return {
			period: { startDate, endDate },
			groupBy,
			data: results
		};
	}

	// Детальная информация о заказах
	static async getEarningsDetails(startDate, endDate, whereClause) {
		const orders = await Order.findAll({
			where: whereClause,
			include: [{
				model: Product,
				through: {
					attributes: ['ordered_product_quantity', 'delivered_product_quantity']
				},
				attributes: ['id', 'name', 'retailPrice', 'wholesalePrice']
			}],
			order: [['created_at', 'ASC']]
		});

		return orders.map(order => ({
			id: order.id,
			createdAt: order.created_at,
			price: order.price,
			products: order.products.map(product => ({
				id: product.id,
				name: product.name,
				retailPrice: product.retailPrice,
				wholesalePrice: product.wholesalePrice,
				orderedQuantity: product.ProductOrder.ordered_product_quantity,
				deliveredQuantity: product.ProductOrder.delivered_product_quantity
			}))
		}));
	}

	// Статистика по товарам за период
	static async getProductStats(startDate, endDate) {
		const productStats = await ProductOrder.findAll({
			attributes: [
				'product_id',
				[sequelize.fn('SUM', sequelize.col('ordered_product_quantity')), 'totalOrdered'],
				[sequelize.fn('SUM', sequelize.col('delivered_product_quantity')), 'totalDelivered']
			],
			include: [{
				model: Order,
				where: {
					created_at: {
						[Op.between]: [startDate, endDate]
					}
				},
				attributes: []
			}, {
				model: Product,
				attributes: ['name', 'retailPrice', 'wholesalePrice']
			}],
			group: ['product_id', 'Product.id'],
			raw: true
		});

		return productStats;
	}
}

module.exports = new EarningsService();