 const db = require('../models');
 const { validationResult } = require('express-validator');


 const Question = db.questions;

exports.createQuestion = async (req,res,next) => {
        const error = validationResult(req.body);
        if(!error.isEmpty()) {
            return res.status(400).json({error:error.array()})
        }
        const { question } = req.body;
        let qquestion;
        try {
             qquestion = await Question.create({
                 question,
                 userId:req.user.userId,
                 date:Date.now()
             })
        }catch(err) {
            console.log(err);
            return next(
                new HttpError('could not save question',500)
           )
        }
        res.status(201).json({question:qquestion});
} 
exports.getQuestions = async (req,res,next) => {
   let questions;
   try {
         questions = await Question.findAll();
   }catch(err) {
    return next(
        new HttpError('questions not found',500)
   )
   }
   res.status(200).json({questions});

} 
exports.getQuestion = async (req,res,next) => {
    const id = req.params.id;
    let question;
    try {
         question = await Question.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('question not found',500)
       )
    }
    res.status(200).json({question})
} 
exports.updateQuestion = async (req,res,next) => {
    const id = req.params.id;
    let question;
    try {
           question = await Question.findByPk(id)
    }catch(err) {
        return next(
            new HttpError('question not found',500)
       )
    }

    let updatedQuestion;
    try {
            updatedQuestion = await Question.upsert({
                id:id,
                question: req.body.question || question.question
            })
    }catch(err) {
        return next(
            new HttpError('could not update question',500)
       )
    }

    res.status(201).json({question:updatedQuestion})
} 
exports.deleteQuestion = async (req,res,next) => {
    const id = req.params.id;
    let question;
    try {
           question = await Question.findByPk(id)
    }catch(err) {
        return next(
            new HttpError('question not found',500)
       )
    }
    if(question) {
        await question.destroy();
    }

    res.status(200).json({
        message:'question deleted'
    })
} 

