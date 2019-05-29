const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const handeleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({errors: validationErrors.array()});// .array()
    }
  
    next();
  }
  
  const createUser = async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  
      await usersModel.create(req.body);
      res.status(201).json({msg: `User was created! for ${req.body.userName}`});
    }catch (error) {
      next(error);
    }
  }

  module.exports = {createUser, handeleValidationErrors};
