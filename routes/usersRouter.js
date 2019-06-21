const express= require('express');
const usersRouter= express.Router();
const {createUser, handeleValidationErrors, loginUser, createClass, addTeacher, deleteClass, deleteTeacher, updateTeacher, addStudents, deleteStudent, updateStudent, logoutUser}= require('../middleware/userMiddleware');
const {userCreateValidator}= require('../helpers/validateUserCreate');
const isAuth= require('../middleware/isAuth');
const isAdmin= require('../middleware/isAdmin');
const {isSchoolSameClass, isSchoolSameTeacher, isSchoolSameStudent}= require('../middleware/isSchoolSame');
const loginValidatorFirst3= [...userCreateValidator];
loginValidatorFirst3.splice(3,6);

usersRouter.post('/create', userCreateValidator,handeleValidationErrors,createUser,loginUser);
usersRouter.post('/login', loginValidatorFirst3, handeleValidationErrors,loginUser);
usersRouter.get('/logout', isAuth, logoutUser);

usersRouter.post('/admin/createClass',isAuth,isAdmin, createClass);
usersRouter.delete('/admin/deleteClass',isAuth,isAdmin, isSchoolSameClass, deleteClass);

usersRouter.post('/admin/addTeacher',isAuth,isAdmin, isSchoolSameClass, addTeacher);
usersRouter.delete('/admin/deleteTeacher',isAuth,isAdmin, isSchoolSameClass, deleteTeacher);
usersRouter.put('/admin/updateTeacher',isAuth,isAdmin, isSchoolSameTeacher, updateTeacher);

usersRouter.post('/admin/addStudents',isAuth,isAdmin, isSchoolSameClass, addStudents);
usersRouter.delete('/admin/deleteStudent',isAuth,isAdmin, isSchoolSameClass, deleteStudent);
usersRouter.put('/admin/updateStudent',isAuth,isAdmin, isSchoolSameStudent, updateStudent);


module.exports= usersRouter;
