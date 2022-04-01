const db = require('../../models');
const bcrypt = require('bcrypt');
const HttpError = require('../../helpers/http-error');

const Professional = db.professionals;

exports.createProfessional = async (req,res,next) => {
    const { 
        subcategoryId, 
        firstName,
        lastName,
        email,
        password,
        location,
        cellNumber
    } = req.body;

     let professional = {
         subcategoryId,
         firstName,
         lastName,
         email,
         password,
         location,
         cellNumber,
         image:req.file.path
     };
     try {
         professional = await Professional.create({professional})
     }catch(err) {
         return next(
             new HttpError('could not save professional')
         )
     }
}
exports.getProfessionals = async (req,res,next) => {
    let professionals;
    try {
        professionals = await Professional.findAll();
    }catch(err) {
       return next(
           new HttpError('could not fetch professional',400)
       )
    }
    res.status(200).json({professionals})
}
exports.getProfessional = async (req,res,next) => {
    const id  = req.params.id;
    let professional;
    try {
        professional = await Professional.findByPk(id);
    }catch(err) {
       return next(
           new HttpError('could not fetch professional',400)
       )
    }
    res.status(200).json({professional})
}
exports.updateProfessional = async (req,res,next) => {
    const id  = req.params.id;
    let professional;
    try {
        professional = await Professional.findByPk(id);
    }catch(err) {
       return next(
           new HttpError('could not fetch professional',400)
       )
    }
    let updatedProfessional;
    try {

    }catch(err) {
        updatedProfessional = Professional.upsert({
            id:id,
        })
    }
}
exports.deleteProfessional = async (req,res,next) => {
    const id  = req.params.id;
    let professional;
    try {
        professional = await Professional.findByPk(id);
    }catch(err) {
       return next(
           new HttpError('could not fetch professional',400)
       )
    }
    if(professional) {
        await professional.destroy();
    }
    res.status(200).json({
        message:'user deleted',
        professional
    })
}