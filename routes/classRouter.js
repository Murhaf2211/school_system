const express = require('express');
const classRouter = express.Router();
const isAuth = require('../middleware/isAuth');
const {isAdmin} = require('../middleware/isAdmin');
const { createClass, deleteClass } = require('../middleware/classMiddleware');
const { validateClassCreation, validateClassDelete } = require('../helpers/validateUserCreate');
const { handeleValidationErrors } = require('../middleware/errorHandler');

classRouter.post('/createClass', validateClassCreation, handeleValidationErrors, isAuth, isAdmin, createClass);
classRouter.delete('/deleteClass', validateClassDelete, handeleValidationErrors, isAuth, isAdmin, deleteClass);

module.exports = classRouter;
