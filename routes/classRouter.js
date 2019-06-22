const express = require('express');
const classRouter = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const { createClass, deleteClass } = require('../middleware/classMiddleware');

classRouter.post('/createClass', isAuth, isAdmin, createClass);
// classRouter.delete('/deleteClass',isAuth, isAdmin, isSchoolSameClass, deleteClass);

module.exports = classRouter;
