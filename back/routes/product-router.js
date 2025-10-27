const {Router} = require("express");

const productController = require("../controllers/product-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/:id", productController.getProductById);
router.get("/", productController.getProducts);
router.get("/search/:query", productController.searchProduct);

// router.post("/new", productController.createProduct);
router.post("/import", authMiddleware, productController.importProductsFromFile);

router.delete("/:id", productController.deleteProduct);

router.patch("/:id", productController.updateProduct);
//router.patch("/list/brand/:brandId", productController.updateProductPriceByBrandId);

module.exports = router;