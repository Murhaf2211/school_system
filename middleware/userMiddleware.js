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

  const loginUser = async(req, res, next)=>{
    try{
      const findUserByEmail = await usersModel.findOne({email: req.body.email});
      if(!findUserByEmail) return res.status(404).json({msg:'Your email not exist, please first sign-up'});

      const passwordMatches = await bcrypt.compare(req.body.password, findUserByEmail.password);
      if(!passwordMatches) return res.status(400).json({msg:'Password invalid'});

    const initialToken = await jwt.sign({email: findUserByEmail.email, role: findUserByEmail.role}, process.env.SECRET);
    const token = 'Bearer+role ' + initialToken;
    res.cookie('authTokenWithRole', token, {httpOnly: true});
    res.status(200).json({msg:`${findUserByEmail.userName},congratulation you got cookie`});

  }catch (error) {
    next(error);
  }
}

  module.exports = {createUser, handeleValidationErrors, loginUser};
