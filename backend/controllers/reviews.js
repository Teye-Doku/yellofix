const db = require('../models');
const { validationResult } = require('express-validator');
const HttpError = require('../helpers/http-error');

const Review = db.reviews;

exports.createReview = async (req,res,next) => {
    const error = validationResult(req.body);
    if(!error.isEmpty()) {
        res.status(400).json({error:error.array()})
    }

    const { message } = req.body;
    let review = {
        userId:req.user.userId,
        message,
        userEmail:req.user.email
    }
     try {
         review = await Review.create(review);
     }catch(err) {
         return next(
             new HttpError('could not save review',500)
         )
     }
    res.status(201).json({review})

}
exports.getReviews = async (req,res,next) => {
    let reviews;
    try {
         reviews =  await Review.findAll();
    }catch(err) {
        return next(
            new HttpError('could not fetch reviews',500)
        )
    }
    res.status(200).json({reviews})
}
exports.getReview = async (req,res,next) => {
      const id = req.params.id;
      let review;
      try {
             review = await Review.findByPk(id);
        }catch(err) {
            return next(
                new HttpError('could not fetch review',500)
            )
        }
        res.status(200).json({review});
}
exports.updateReview = async (req,res,next) => {
    const id = req.params.id;
    let review;
    try {
           review = await Review.findByPk(id);
      }catch(err) {
          return next(
              new HttpError('could not fetch review',500)
          )
      }

      let updatedReview;
      try {
           updatedReview = await Review.upsert({
               id:id,
               message: req.body.message || review.message
           }) 
      }catch(err) {
          return next(
              new HttpError('could not save review')
          )
      }
      res.status(201).json({review:updatedReview});
}
exports.deleteReview = async (req,res,next) => {
    const id = req.params.id;
    let review;
    try {
           review = await Review.findByPk(id);
      }catch(err) {
          return next(
              new HttpError('could not fetch review',500)
          )
      }

     if(review) {
         await review.destroy();
     }  

     res.status(200).json({
         message: 'review deleted',
         review
     })
}