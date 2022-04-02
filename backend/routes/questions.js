const express = require('express');
const { body } = require('express-validator');
const questionController = require('../controllers/questions');



const router = express.Router();
router.post('/',[
    body('question').not().isEmpty().withMessage('question is required')
],questionController.createQuestion);
router.get('/',questionController.getQuestions);
router.get('/:id',questionController.getQuestion);
router.put('/:id',questionController.updateQuestion);
router.delete('/:id',questionController.deleteQuestion);
module.exports = router;