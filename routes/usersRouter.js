const express= require('express');
const usersRouter= express.Router();
const {createUser, loginUser, logoutUser}= require('../middleware/userMiddleware');
const { handeleValidationErrors } = require('../middleware/errorHandler');
const {userCreateValidator} = require('../helpers/validateUserCreate');
const isAuth= require('../middleware/isAuth');

usersRouter.post('/create', userCreateValidator, handeleValidationErrors, createUser);
usersRouter.post('/login', userCreateValidator, handeleValidationErrors, loginUser);
usersRouter.get('/logout', isAuth, logoutUser);

module.exports= usersRouter;
