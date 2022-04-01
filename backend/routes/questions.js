const express = require('express');
const { body } = require('express-validator');
const questionController = require('../controllers/questions');
const userAuth = require('../middleware/authmiddleware');


const router = express.Router();
router.post('/',userAuth.protect,[
    body('question').not().isEmpty().withMessage('question is required')
],questionController.createQuestion);
router.get('/',questionController.getQuestions);
router.get('/:id',questionController.getQuestion);
router.put('/:id',questionController.updateQuestion);
router.delete('/:id',questionController.deleteQuestion);
module.exports = router;