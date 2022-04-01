const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviews');
const userAuth = require('../middleware/authmiddleware');


const router = express.Router();

router.post('/',userAuth.protect,[
    body('message').not().isEmpty().withMessage('message is required')
],reviewController.createReview);
router.get('/',reviewController.getReviews);
router.get('/:id',reviewController.getReview);
router.put('/:id',reviewController.updateReview);
router.delete('/:id',reviewController.deleteReview);


module.exports = router;