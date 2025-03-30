const { Router } = require("express");

const categoryController = require("../controllers/category-controller");
const router = new Router();

router.post("/new", categoryController.createCategory);

router.get('/:id', categoryController.getCategoryById);
router.get("/", categoryController.getCategoryList);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;