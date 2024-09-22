const Router = require("express")

const exchangeController = require("../controllers/exchange-controller");

const router = new Router();

router.post("/new", exchangeController.createOrUpdateExchange);

router.get("/", exchangeController.getExchangeStatistics);
router.get("/:exchangeDate", exchangeController.getExchangeByDate);

module.exports = router;