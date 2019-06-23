const express = require('express');
const studentRouter = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const { addStudent, deleteStudent } = require('../middleware/studentMiddleware');
const { validateStudentAddition } = require('../helpers/validateUserCreate')
const { handeleValidationErrors } = require('../middleware/errorHandler');

studentRouter.post('/addStudent',validateStudentAddition, handeleValidationErrors, isAuth, isAdmin, addStudent);
studentRouter.delete('/deleteStudent',validateStudentAddition, handeleValidationErrors, isAuth, isAdmin, deleteStudent);

module.exports = studentRouter;
