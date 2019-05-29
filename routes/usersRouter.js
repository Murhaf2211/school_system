const express= require('express');
const usersRouter= express.Router();
const {createUser, handeleValidationErrors}= require('../middleware/userMiddleware');
const {userCreateValidator}= require('../helpers/validateUserCreate');
const isAuth= require('../middleware/isAuth');

usersRouter.post('/create', userCreateValidator,handeleValidationErrors,createUser);

module.exports= usersRouter;
