const ApiError = require("../exceptions/api-error");
const { Exchange } = require("../models/db-models");
const getDay = require("../util/day-formula");

class ExchangeController {
	async createOrUpdateExchange(req, res, next) {
		const { currencyList } = req.body;
		const currentDay = getDay();
		let result;
		try {
			const candidate = await Exchange.findOne({ where: { updated_at: currentDay } });
			if (!candidate) {
				const newExchangeCourse = await Exchange.create({
					currencyList,
					created_at: currentDay,
					updated_at: currentDay
				});
				result = { result: newExchangeCourse };
			} else {
				candidate.currencyList = currencyList;
				candidate.updated_at = currentDay;
				await candidate.save();
				result = { result: candidate };
			}
		} catch (error) {
			console.log(error);
			return next(error);
		}

		return res.status(201).json(result);
	}

	async getExchangeByDate(req, res, next) {
		const { exchangeDate } = req.params;
		let result;
		try {
			result = await Exchange.findOne({ where: { updatedAt: exchangeDate } });

			if (!result) return next(ApiError.SearchError({ model: "Exchange", name: "updatedAt", value: exchangeDate }));
		} catch (error) {
			console.log(error);
			return next(error);
		}

		return res.status(200).json({ result });
	}

	async getExchangeStatistics(req, res, next) {
		let result;
		try {
			result = await Exchange.findAll();
		} catch (error) {
			console.log(error);
			return next(error);
		}
		return res.status(200).json({ result });
	}
}

module.exports = new ExchangeController();