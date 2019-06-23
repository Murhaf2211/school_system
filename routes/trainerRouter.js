const express = require('express');
const trainerRouter = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const { deleteTrainer, updateTrainer } = require('../middleware/trainerMiddleware');
const { validateClassDelete, validateUpdateTrainer } = require('../helpers/validateUserCreate');
const { handeleValidationErrors } = require('../middleware/errorHandler');

trainerRouter.delete('/deleteTrainer', validateClassDelete, handeleValidationErrors, isAuth, isAdmin, deleteTrainer);
trainerRouter.put('/updateTrainer', validateUpdateTrainer, handeleValidationErrors, isAuth, isAdmin, updateTrainer);

module.exports = trainerRouter;
