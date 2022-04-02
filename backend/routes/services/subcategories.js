const express = require('express');
const subCategoryController = require('../../controllers/services/subcategories');
const router = express.Router();
const fileUpload = require('../../middleware/file-upload');


router.post('/',fileUpload('uploads/category').single('image'),subCategoryController.createSubCategory);
router.get('/',subCategoryController.getSubCategories);
router.get('/:id',subCategoryController.getSubCategory);
router.put('/:id',subCategoryController.updateSubCategory);
router.delete('/:id',subCategoryController.deleteSubCategory);

module.exports = router;