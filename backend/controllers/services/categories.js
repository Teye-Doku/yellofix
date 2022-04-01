const db = require('../../models');
const HttpError = require('../../helpers/http-error');

const Category = db.categories;

exports.createCategory  = async (req,res,next) => {
     const { title } = req.body;
     let category = {
         title,
         image: req.file.path
     };
     try {
        category = await Category.create(category);
     }catch(err) {
         return next(
             new HttpError('could not create category')
         );
     }
     res.status(201).json({category});
};
exports.getCategories  = async (req,res,next) => {
    let categories;
    try {
         categories = await Category.findAll();
    }catch(err) {
        return next(
            new HttpError('could not create category')
        );
    }
    res.status(200).json({categories});
};
exports.getCategory  = async (req,res,next) => {
    const id = req.params.id;
    let category;
    try {
           category = await Category.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not found category')
        )
    }
    res.status(200).json({category})
};
exports.updateCategory  = async (req,res,next) => {
    const id = req.params.id;
    let category;
    try {
           category = await Category.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not found category')
        )
    }
    let updatedCategory; 
    try {
         updatedCategory = await Category.upsert({
             id:id,
             title: req.body.category || category.title
         })
    }catch(err) {
        return next(
            new HttpError('could not updated category')
        )
    }
    res.status(201).json({category:updatedCategory});
};
exports.deleteCategory  = async (req,res,next) => {
    const id = req.params.id;
    let category;
    try {
           category = await Category.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not found category')
        )
    }
    if(category) {
        await category.destroy()
    }
    res.status(200).json({
        message:"category deleted",
        category
    })
};

