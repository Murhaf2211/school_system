const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const classesModel = require('../models/classesModel');
const usersModel = require('../models/usersModel');


// try to do it function
const isSchoolSame = async (req, res, next, model, bodyField) => {
  
  try {
   const decodedUser = await jwt.decode(req.token, process.env.SECRET);
   const findedUserOrCourse =await classesModel.findOne({classCode: req.body.classCode, school: decodedUser.school});
   if(findedUserOrCourse) next();
   else res.status(201).json('Can not, this course is not for your school or not exist');

  }catch(error) {
    next(error);
  }
}

const isSchoolSameClass = async (req, res, next) => {
  
    try {
     const decodedUser = await jwt.decode(req.token, process.env.SECRET);
     const findedUserOrCourse =await classesModel.findOne({classCode: req.body.classCode, school: decodedUser.school});
     if(findedUserOrCourse) next();
     else res.status(201).json('Can not, this course is not for your school or not exist');
  
    }catch(error) {
      next(error);
    }
  }

  const isSchoolSameTeacher = async (req, res, next) => {
  
    try {
     const decodedUser = await jwt.decode(req.token, process.env.SECRET);
     const findedUserOrCourse =await usersModel.findOne({userName: req.body.teacher, school: decodedUser.school});
     if(findedUserOrCourse) next();
     else res.status(201).json('Can not, this Teacher is not for your school or not exist');
  
    }catch(error) {
      next(error);
    }
  }

  const isSchoolSameStudent = async (req, res, next) => {
  
    try {
     const decodedUser = await jwt.decode(req.token, process.env.SECRET);
     const findedUserOrCourse =await usersModel.findOne({userName: req.body.student, school: decodedUser.school});
     if(findedUserOrCourse) next();
     else res.status(201).json('Can not, this Student is not for your school or not exist');
  
    }catch(error) {
      next(error);
    }
  }

module.exports = {isSchoolSameClass, isSchoolSameTeacher, isSchoolSameStudent};