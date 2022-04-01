 const express = require('express');
 const categoryController = require('../../controllers/services/categories');
 const fileUpload = require('../../middleware/file-upload');

 const router = express.Router();

 router.post('/',fileUpload('uploads/category').single('image'),categoryController.createCategory);
 router.get('/',categoryController.getCategories);
 router.get('/',categoryController.getCategory);
 router.put('/:id',categoryController.updateCategory);
 router.delete('/:id',categoryController.deleteCategory);

 module.exports = router;