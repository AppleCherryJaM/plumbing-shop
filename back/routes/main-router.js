const {Router} = require("express")

const router = new Router();

const userRouter = require("./user-router");
const productRouter = require("./product-router");
const orderRouter = require("./order-router");
const storeRouter = require("./store-router");
const brandRouter = require("./brand-router");
const categoryRouter = require("./category-router");
const exchangeRouter = require("./exchange-router");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/store", storeRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use('/exchange', exchangeRouter);

module.exports = router;