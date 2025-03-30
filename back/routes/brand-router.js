const { Router } = require("express")

const brandController = require("../controllers/brand-controller");

const router = new Router();

router.post("/new", brandController.createBrand);
//router.patch("/discount/:id", brandController.updateBrandProductsDiscount);

router.get("/list", brandController.getBrandList);
router.get("/:id", brandController.getBrandById);

router.delete("/:id", brandController.deleteBrand);


module.exports = router;