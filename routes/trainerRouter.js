const express = require('express');
const trainerRouter = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const { deleteTrainer, updateTrainer } = require('../middleware/trainerMiddleware');

// trainerRouter.delete('/deleteTeacher',isAuth, isAdmin, isSchoolSameClass, deleteTrainer);
// trainerRouter.put('/updateTeacher',isAuth, isAdmin, isSchoolSameTeacher, updateTrainer);

module.exports = trainerRouter;
