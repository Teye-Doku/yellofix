const express = require('express');
const subCategoryController = require('../../controllers/services/subcategories');
const router = express.Router();

router.post('/',subCategoryController.createSubCategory);
router.get('/',subCategoryController.getSubCategories);
router.get('/:id',subCategoryController.getSubCategory);
router.put('/:id',subCategoryController.updateSubCategory);
router.delete('/:id',subCategoryController.deleteSubCategory);

module.exports = router;