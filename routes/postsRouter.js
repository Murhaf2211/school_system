const express = require('express');
const postsRouter = express.Router();
const { validatePostCreate } = require('../helpers/validateUserCreate');
const { handeleValidationErrors } = require('../middleware/errorHandler');
const { isStudent } = require('../middleware/isAdmin');
const { createPost } = require('../middleware/postsMiddleware');
const isAuth = require('../middleware/isAuth');

postsRouter.post('/create', validatePostCreate, handeleValidationErrors, isAuth, isStudent, createPost);

module.exports = postsRouter;
