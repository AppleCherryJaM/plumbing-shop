const { Router } = require("express");

const storeController = require("../controllers/store-controller");

const router = new Router();

router.post("/new", storeController.createStore);

router.get("/:id", storeController.getStore);
router.get("/product/:id", storeController.getStoresWithCurrentProduct);

router.delete("/:id", storeController.deleteStore);

module.exports = router;