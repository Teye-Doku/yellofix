const db = require('../models');
const HttpError = require('../helpers/http-error');
const { validationResult } = require("express-validator");

const Credit = db.credits;

exports.createCredit = async (req,res,next) => {
    const error = validationResult(req.body);
    if(!error.isEmpty()) {
        return res.status(400).json({error:error.array()})
    }
    const { membershipType,title,currencyName,fees } = req.body;

    let credit = {
        membershipType,
        title,
        currencyName,
        duration:Date.now(),
        fees,
    }
    try {
            credit = await Credit.create(credit);
    }catch(err) {
        return next(
            new HttpError('could not save credit',433)
        )
    }
    res.status(201).json({credit});
}
exports.getCredits = async (req,res,next) => {
      let credits;

      try {
            credits = await Credit.findAll();
      }catch(err) {
          return next(
              new HttpError('could not fetch credits',500)
          )
      }
      res.status(200).json({credits})
}
exports.getCredit = async (req,res,next) => {
    const id = req.params.id;
    let credit;
    try {
         credit = await Credit.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not fetch credit',404)
        )
    }
    res.status(200).json({credit})
}
exports.updateCredit = async (req,res,next) => {
     const id = req.params.id;
     let credit;
     try {
           credit = await Credit.findByPk(id);
     }catch(err) {
         return next(
             new HttpError('could not fetch credit',500)
         )
     }

     let updatedCredit;
     try {
          updatedCredit = await Credit.upsert({
              id:id,
              membershipType: req.body.membershipType || credit.membershipType,
              title: req.body.tile || credit.title,
              duration: Date.now() || credit.duration,
              currencyName: req.body.currencyName || credit.currencyName,
              fees:req.body.fees || credit.fees
          })
     }catch(err) {
         return next(
             new HttpError('could not save credit')
         )
     }
     res.status(201).json({credit:updatedCredit});
}
exports.deleteCredit = async (req,res,next) => {
    const id = req.params.id;
    let credit;
    try {
          credit = await Credit.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not find credit',404)
        )
    }
    if(credit) {
         await credit.destroy();
    }
    res.status(200).json({
        message:"credit deleted",
        credit
    })
}