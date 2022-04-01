const express = require('express');
const { body } = require('express-validator');

const usersController = require('../../controllers/users/users.js');

const router  = express.Router();

router.post('/register',[
    body('cellNumber').not().isEmpty().withMessage('cellnumber is required'),
    body('firstName').not().isEmpty().withMessage('firstname is required'),
    body('lastName').not().isEmpty().withMessage('lastname is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').not().isEmpty().withMessage('lastname is required'),

],usersController.RegisterUser);
router.post('/signup',[
    body('cellNumber').not().isEmpty().withMessage('cellnumber is required'),
    body('firstName').not().isEmpty().withMessage('firstname is required'),
    body('lastName').not().isEmpty().withMessage('lastname is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').not().isEmpty().withMessage('lastname is required'),

],usersController.SignUp);
router.post('/verify',usersController.verifyOpt);
router.get('/',usersController.getUsers)
router.post('/login',usersController.loginUser);
router.get('/:id',usersController.getUser)
router.put('/:id',usersController.updateUser);
router.delete('/:id',usersController.deleteUser);
router.post('/auth/google',usersController.googleAuth);
router.post('/auth/twitter',usersController.twitterAuth);
router.post('/auth/facebook',usersController.facebookAuth);
router.post('/auth/linkedin',usersController.linkedinAuth);

module.exports = router;