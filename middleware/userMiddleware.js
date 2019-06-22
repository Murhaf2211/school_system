const schoolModel = require('../models/schoolModel');
const trainerModel = require('../models/trainerModel');
const studentModel = require('../models/studentModel');
const classesModel = require('../models/classesModel');
const { validationResult } = require('express-validator/check');
const { possibleRoles } = require('../helpers/validateUserCreate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const possibleCollections = [schoolModel, trainerModel, studentModel];

const handeleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({errors: validationErrors.array()});// .array()
    }
    next();
  }

  const createUser = async (req, res, next) => {
    try {
      const findIndexCollection = possibleRoles.findIndex(role => role === req.body.role);
      const checkUserName = await possibleCollections[findIndexCollection].findOne({userName: req.body.userName});

      if (checkUserName) {
        return res.status(400).json({msg: 'Username already exists'});
      }

      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      await possibleCollections[findIndexCollection].create(req.body);
      return res.status(200).json({msg: 'The user was created'});

    }catch (error) {
      next(error);
    }
  }

  const loginUser = async(req, res, next)=>{
    try{
      // A select field is there
      const findIndexCollection = possibleRoles.findIndex(role => role === req.body.role);
      const findByUserName = await possibleCollections[findIndexCollection].findOne({userName: req.body.userName});

      if (!findByUserName) {
        return res.status(404).json({msg:'A user with the given role does not exist. Try again!'});
      }

      const passwordMatches = await bcrypt.compare(req.body.password, findByUserName.password);

      if(!passwordMatches) {
        return res.status(400).json({msg:'Password invalid'});
      }

    const initialToken = await jwt.sign({userName: findByUserName.userName, role: findByUserName.role}, process.env.SECRET);
    const token = 'Bearer ' + initialToken;
    res.cookie('authToken', token, {httpOnly: true});
    return res.status(200).json({msg:`${findByUserName.userName},congratulation you got cookie`});

  }catch (error) {
    next(error);
  }
}

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('authToken');

    return res.status(200).json({msg: 'User is logged out'});
  }catch (error) {
    next(error);
  }
}

module.exports = {createUser, handeleValidationErrors, loginUser, logoutUser};
