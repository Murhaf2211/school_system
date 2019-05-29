const express= require('express');
const usersRouter= express.Router();
const {createUser, handeleValidationErrors, loginUser}= require('../middleware/userMiddleware');
const {userCreateValidator}= require('../helpers/validateUserCreate');
const isAuth= require('../middleware/isAuth');
const loginValidatorFirst3= [...userCreateValidator];
loginValidatorFirst3.splice(3,4);

usersRouter.post('/create', userCreateValidator,handeleValidationErrors,createUser);
usersRouter.post('/login', loginValidatorFirst3, handeleValidationErrors,loginUser);
module.exports= usersRouter;
