const { Sequelize } = require("../database/db");

class OrderService {
	async getOrderList(params) {
		const { dateParams, orderStatus, isStatusFilterSelected, userId } = params; // dateParams = {type: 'day', date: "06.10.2024"}
		let query = "SELECT * FROM orders ";
		if (dateParams|| isStatusFilterSelected || userId) {
			query += "WHERE ";
			
			if (userId) {
				query += `user_id = ${userId} `;
				if (dateParams || isStatusFilterSelected) query+= "AND "
			}

			if (isStatusFilterSelected) {
				query += `isOpened = ${orderStatus} `;
				if (dateParams) query += "AND "
			}
			
			if (dateParams){
				switch (dateParams.type) {
					case 'day':
						query += `createdAt = ${dateParams.date}`;
						break;
					case 'month':
						query += `substring(createdAt, 4, 2) = ${dateParams.date.substring(3, 5)}`;
						break;
					case "year":
						query += `substring(createdAt, 7, 4) = ${dateParams.date.substring(6, 10)}`;
						break;
				}
			}
		}
		const result = await Sequelize.query(query);
		return result;
	}
}

module.exports = new OrderService();