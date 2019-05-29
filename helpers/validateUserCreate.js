const {check}= require('express-validator/check');
const usersModel= require('../models/usersModel');

const userCreateValidator= [

    check('email').trim().isEmail().withMessage('The email you have passed is invalid').escape(),

    check('password').trim().isLength({min:8, max:35}).withMessage('The passsword should be between 8 and 20 characters').escape(),

    check(['email','password']).exists().not().isEmpty().withMessage('All the email and password fields are required to access your school'),

    check(['userName','role']).exists().not().isEmpty().withMessage('All the Username and role fields are required to access your school'),

    check('userName').trim().isLength({min:3, max:35}).withMessage('The username should be between 4 and 35 characters').escape(),

    check('role').custom(roleProvided =>{
        console.log(roleProvided);
            if(roleProvided!="student" && roleProvided!="teacher") throw new Error('You should choose Student or Teacher');
            else return true;
        }).escape(),

    check('email').custom(async emailProvided =>{
        const user = await usersModel.findOne({email: emailProvided});
        if(user){ throw new Error('This email already exists');}
    }).escape()

];

module.exports= {userCreateValidator};