const db = require('../models');

const Subscription = db.subscriptions;

exports.createSubscription = async (req,res,next) => {
    const error = validationResult(req.body);
    if(!error.isEmpty()) {
        return res.status(400).json({error:error.array()})
    }
    const { membershipType,title,currencyName,fees } = req.body;

    let subcription = {
        membershipType,
        title,
        currencyName,
        duration:Date.now(),
        fees,
    }
    try {
            subcription = await Subscription.create(subcription);
    }catch(err) {
        return next(
            new HttpError('could not save subcription',433)
        )
    }
    res.status(201).json({subcription});
}
exports.getSubscriptions = async (req,res,next) => {
    let subcriptions;

    try {
          subcriptions = await Subscription.findAll();
    }catch(err) {
        return next(
            new HttpError('could not fetch subcriptions',500)
        )
    }
    res.status(200).json({subcriptions})
}
exports.getSubscription = async (req,res,next) => {
    const id = req.params.id;
    let subcription;
    try {
         subcription = await Subscription.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not fetch subcription',404)
        )
    }
    res.status(200).json({subcription})
}
exports.updateSubscription = async (req,res,next) => {
    const id = req.params.id;
     let subcription;
     try {
           subcription = await Subscription.findByPk(id);
     }catch(err) {
         return next(
             new HttpError('could not fetch subcription',500)
         )
     }

     let updatedSubscription;
     try {
          updatedSubscription = await Subscription.upsert({
              id:id,
              membershipType: req.body.membershipType || subcription.membershipType,
              title: req.body.tile || subcription.title,
              duration: Date.now() || subcription.duration,
              currencyName: req.body.currencyName || subcription.currencyName,
              fees:req.body.fees || subcription.fees
          })
     }catch(err) {
         return next(
             new HttpError('could not save subcription')
         )
     }
     res.status(201).json({credit:updatedSubscription});
}
exports.deleteSubscription = async (req,res,next) => {
    const id = req.params.id;
    let subscription;
    try {
          subscription = await Subscription.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could not find subscription',404)
        )
    }
    if(subscription) {
         await subscription.destroy();
    }
    res.status(200).json({
        message:"subscription deleted",
        subscription
    })
}