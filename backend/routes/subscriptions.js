const express = require('express');
const { body } = require('express-validator');
const subscriptionController = require('../controllers/subscriptions');



const router = express.Router();
router.post('/',[
    body("membershipType").not().isEmpty().withMessage('membershipType is required'),
    body("title").not().isEmpty().withMessage('title is required'),
    body("duration").not().isEmpty().withMessage('duration is required'),
    body("currencyName").not().isEmpty().withMessage('currencyName is required'),
    body("fees").not().isEmpty().withMessage('fees is required')
],subscriptionController.createSubscription);
router.get('/',subscriptionController.getSubscriptions);
router.get('/:id',subscriptionController.getSubscription);
router.put('/:id',subscriptionController.updateSubscription);
router.delete('/:id',subscriptionController.deleteSubscription);


module.exports = router;