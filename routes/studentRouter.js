const express = require('express');
const studentRouter = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const { addStudent, deleteStudent } = require('../middleware/studentMiddleware');

// studentRouter.post('/addStudent',isAuth,isAdmin, isSchoolSameClass, addStudents);
// studentRouter.delete('/deleteStudent',isAuth,isAdmin, isSchoolSameClass, deleteStudent);

module.exports = studentRouter;
