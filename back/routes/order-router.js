const { Router } = require("express");

const orderController = require("../controllers/order-controller");

const router = new Router();

router.get("/orders", orderController.getOrders);
router.get("/:id", orderController.getOrderById);

router.post("/new", orderController.createOrder);

router.delete("/:id", orderController.deleteOrder);


module.exports = router;