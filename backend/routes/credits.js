const express = require('express');
const { body } = require('express-validator');
const creditController = require('../controllers/credits');


const router = express.Router();
router.post('/',[
    body("membershipType").not().isEmpty().withMessage('membershipType is required'),
    body("title").not().isEmpty().withMessage('title is required'),
    body("duration").not().isEmpty().withMessage('duration is required'),
    body("currencyName").not().isEmpty().withMessage('currencyName is required'),
    body("fees").not().isEmpty().withMessage('fees is required')
],creditController.createCredit);
router.get('/',creditController.getCredits);
router.get('/:id',creditController.getCredit);
router.put('/:id',creditController.updateCredit);
router.delete('/:id',creditController.deleteCredit);

module.exports = router;