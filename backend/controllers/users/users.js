const db = require('../../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { googleClient } =require('google-auth-library')
const optGenerator = require('otp-generator');
const HttpError = require('../../helpers/http-error');
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})



const User = db.users;
const Opt = db.opts;


exports.RegisterUser = async (req,res,next) => {
     const error = validationResult(req.body);
     if(!error.isEmpty()) {
          return res.status(400).json({error:error.array()})
     }
     const { cellNumber,firstName,lastName,email,password} = req.body;

     let existingUser;
     try {
          existingUser = await User.findOne({where:{email}})
     }catch(err) {
          return next(
               new HttpError('could not found user',404)
          );
     }
     if(existingUser) {
          return next(
               new HttpError('user already exists',400)
          )
          
     }

     let hashedPassword = false;
     try { 
          hashedPassword = await bcrypt.hash(password,10);
     }catch(err) {
        return next(
          new HttpError('failed to hashed password',400)
        )
       
     }

     let user = {
         cellNumber,
         firstName,
         lastName,
         email,
         password:hashedPassword
     }
     try {
           user = await User.create(user);
     }catch(err) {
          return next(
               new HttpError('failed to save user',433)
           );
          
     }

     return res.status(201).json({user});

};
exports.SignUp = async (req,res,next) => {
     const { cellNumber,firstName,lastName,email,password} = req.body;

     let existingUser;
     try {
          existingUser = await User.findOne({where:{cellNumber:cellNumber}})
     }catch(err) {
          return next(
               new HttpError('could not found user',404)
          );
     }
     if(existingUser) {
          return next(
               new HttpError('user already in use',404)
          );
     }
     const OPT = optGenerator.generate(4,{
          digits:true,
          upperCaseAlphabets:true,
          lowerCaseAlphabets:false,
          specialChars:false
          
     });
     

     let opt = {
          number: cellNumber,
          opt:OPT,
          email,
          password,
          firstName,
          lastName
     };
     const salt = await bcrypt.genSalt(10);
     opt.opt = await bcrypt.hash(opt.opt,salt);
     await Opt.create(opt);
     

     vonage.message.sendSms(process.env.VONAGE_BRAND_NAME, cellNumber, OPT, (err, responseData) => {
          if (err) {
              console.log(err);
          } else {
              if(responseData.messages[0]['status'] === "0") {
                  console.log("Message sent successfully.");
              } else {
                  console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
          }
      })

     res.status(200).send("Opt send successfully!")

}
exports.verifyOpt = async (req,res,next) => {
      const { opt,number } = req.body;
      let optfind;
      try {
           optfind = await Opt.findOne({where:{number: number}});
      }catch(err) {
           return next(
                new HttpError('could not find opt',500)
           )
      }
      if(!optfind) {
           return next(
               new HttpError('OPT expired',400)
           )
      }
      let validUser =false;
      try {
            validUser = await bcrypt.compare(opt,optfind.opt);
      }catch(err) {
          return next(
               new HttpError('could not dehash opt',500)
          )
      }

      let hashedPassword = false;
      try { 
           hashedPassword = await bcrypt.hash(optfind.password,10);
      }catch(err) {
         return next(
           new HttpError('failed to hashed password',400)
         )
        
      }
      let user = {
          cellNumber:number,
          firstName:optfind.firstName,
          lastName:optfind.lastName,
          email:optfind.email,
          password:hashedPassword
      }
      if(number === optfind.number && validUser) {
          user = await User.create(user);  
          await optfind.destroy();

          return res.status(201).json({user});
      }else { 

           return res.status(201).send("Opt was wrong.");
      }
      



}
exports.loginUser = async (req,res,next) => {
     const { email,password } = req.body;

     let existingUser;
     try {
         existingUser = await User.findOne({where:{email:email}});
     }catch(e) {
          return next(
               new HttpError('could not found user',404)
          )
     }

     if(!existingUser) {
          return next(
               new HttpError('could not found user',404)
          )
     }

     //comparing passwords
     let hashedPassword = false;
     try {
         hashedPassword = await bcrypt.compare(password,existingUser.password);
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
                 email:existingUser.email,
                 userId:existingUser.id
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
         userId:existingUser.id,
         token:token
     })
};
exports.getUsers = async (req,res,next) => {
     let users;
     try {
          users = await User.findAll();
     }catch(err) {
          return next(
               new HttpError('users not found',500)
          )
     }
     return res.status(200).json({users})
};  
exports.getUser = async (req,res,next) => {
     const id = req.params.id;
     let user;
     try {
          user = await User.findByPk(id);
     }catch(err) {
          return next(
               new HttpError('user not found',404)
          )
     }
     return res.status(200).json({user});
};
exports.deleteUser = async (req,res,next) => {
     const id = req.params.id;
     let user;
     try {
           user = await User.findByPk(id);
     }catch(err) {
          return next(
               new HttpError('user not found',404)
          )
     }
     if(user) {
           await user.destroy()
     }

     res.status(200).json({
          message: 'user deleted',
          user
     })
};
exports.updateUser = async (req,res,next) => {
     const id = req.params.id;
     let user;
     try {
          user = await User.findByPk(id);
     }catch(err) {
          return next(
               new HttpError('user not found',404)
          )
     }

     let updatedUser;
     try {
          updatedUser = await User.upsert({
               id:id,
               lastName: req.body.lastName || user.lastName,
               firstName: req.body.firstName || user.firstName,
               cellNumber: req.body.cellNumber || user.cellNumber,
               email: req.body.email || user.email
          })
     }catch(err) {
          return next(
               new HttpError('user not updated',500)
          )
     }
    return res.status(200).json({updatedUser});

};
exports.googleAuth = async (req,res,next) => {
     const { token } = req.body;

     const ticket = await googleClient.verifyIdToken({
       idToken: token,
       audient: `${process.env.GOOGLE_CLIENT_ID}`,
     });
   
     const payload = ticket.getPayload();
   
     let user = await User.findOne({where:{email:payload?.email}});
     if (!user) {
          await User.create({
           
          })
       user = await new User({
         email: payload?.email,
         avatar: payload?.picture,
         name: payload?.name,
       });
   
       await user.save();
     }
   
     res.json({ user, token });
};
exports.twitterAuth = async (req,res,next) => {};
exports.facebookAuth = async (req,res,next) => {};
exports.linkedinAuth = async (req,res,next) => {};