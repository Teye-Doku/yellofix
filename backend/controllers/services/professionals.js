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
         image:''
     };
     try {
         professional = await Professional.create({professional})
     }catch(err) {
         return next(
             new HttpError('could not save professional')
         )
     }
     res.status(201).json({professional})
}
exports.profLogin = async (req,res,next) => {
    const { email,password } = req.body;

    let existingProfessional;
    try {
        existingProfessional = await Professional.findOne({where:{email:email}});
    }catch(e) {
         return next(
              new HttpError('could not found user',404)
         )
    }

    if(!existingProfessional) {
         return next(
              new HttpError('could not found user',404)
         )
    }

    //comparing passwords
    let hashedPassword = false;
    try {
        hashedPassword = await bcrypt.compare(password,existingProfessional.password);
    }catch(e){
         return next(
              new HttpError('could not hased password',500)
         )
    }

    if(!hashedPassword) {
         return next(
              new HttpError('invalid information provided',500)
         )
    }

    let token;
    try {
        token = await jwt.sign(
            {
                email:existingProfessional.email,
                professionalId:existingProfessional.id
            },
            process.env.JWT_SECRET,
            { expiresIn:'1h'}
        )
    }catch(e) {
         return next(
              new HttpError('wrong credentials provided',500)
         )
    }

    return res.status(200).json({
        professionalId:existingProfessional.id,
        token:token
    })
};
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
    res.status(201).json({professional:updatedProfessional});
}
exports.uploadProfessionalImage = async (req,res,next) => {
    const id = req.params.id;
    let professional;
    try {
         professional = await Professional.findByPk(id);
    }catch(err){
        return next(
            new HttpError('could not fetch professional',500)
        )
    }
    if(!professional) {
        return next(
            new HttpError('could not found professional',404)
        )
    }
    let updatedProfessional;
    try {
          updatedProfessional = Professional.upsert({
              id:id,
              image: req.file.path || professional.image
          })
    }catch(err) {
        return next(
            new HttpError('could not update professional',500)
        )
    }
    res.status(201).json({professional:updatedProfessional});
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