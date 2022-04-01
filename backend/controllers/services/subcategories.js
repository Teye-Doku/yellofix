const db = require('../../models');
const HttpError = require('../../helpers/http-error');

const SubCategory = db.subcategories;

exports.createSubCategory = async (req,res,next) => {
    const { title,categoryId } = req.body;
    let subcategory = {
        categoryId,
         title,
         image:req.file.path
    };
    try {
         subcategory = await SubCategory.create(subcategory);
    }catch(err){
        return next(
            new HttpError('could not save subcategory',500)
        )
    }
    res.status(201).json({subcategory});
}
exports.getSubCategories = async (req,res,next) => {
    let subcategories;
    try {
           subcategories = await SubCategory.findAll();
    }catch(err) {
        return next(
            new HttpError('could not fetch subcategories',500)
        )
    }
    res.status(200).json({subcategories});
}
exports.getSubCategory = async (req,res,next) => {
     const id = req.params.id;
     let subcategory;
     try {
           subcategory = await SubCategory.findByPk(id);
     }catch(err) {
         return next(
             new HttpError('could not fetch subcategory',400)
         )
     }
     if(!subcategory) {
         return next(
             new HttpError('subcategory not found')
         )
     }
     res.status(200).json({subcategory});
}
exports.updateSubCategory = async (req,res,next) => {
    const id = req.params.id;
     let subcategory;
     try {
           subcategory = await SubCategory.findByPk(id);
     }catch(err) {
         return next(
             new HttpError('could not fetch subcategory',400)
         )
     }
     let updatedSubcategory;
     try {
           updatedSubcategory = await SubCategory.upsert({
               id:id,
               title: req.body.title || subcategory.title
           })
     }catch(err) {
         return next(
             new HttpError('could not save category',500)
         )
     }

     res.status(201).json({subcategory:updatedSubcategory})
}
exports.deleteSubCategory = async (req,res,next) => {
    const id = req.params.id;
     let subcategory;
     try {
           subcategory = await SubCategory.findByPk(id);
     }catch(err) {
         return next(
             new HttpError('could not fetch subcategory',400)
         )
     }
     if(subcategory) {
       await  subcategory.destroy();
     }

     res.status(200).json({
         message:'subcategory deleted',
         subcategory
     })
}