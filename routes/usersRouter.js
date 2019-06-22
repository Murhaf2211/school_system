const express= require('express');
const usersRouter= express.Router();
const {createUser, handeleValidationErrors, loginUser, logoutUser}= require('../middleware/userMiddleware');
const {userCreateValidator} = require('../helpers/validateUserCreate');
const isAuth= require('../middleware/isAuth');

usersRouter.post('/create', userCreateValidator, handeleValidationErrors, createUser);
usersRouter.post('/login', userCreateValidator, loginUser);
usersRouter.get('/logout', isAuth, logoutUser);

module.exports= usersRouter;
