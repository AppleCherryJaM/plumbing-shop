const {Router} = require("express");

const productController = require("../controllers/product-controller");

const router = new Router();

router.get("/:id", productController.getProductById);
router.get("/", productController.getProducts);

router.post("/new", productController.createProduct);

router.delete("/:id", productController.deleteProduct);

router.patch("/:id", productController.updateProduct);
//router.patch("/list/brand/:brandId", productController.updateProductPriceByBrandId);

module.exports = router;