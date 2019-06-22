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
      const findUserByEmail = await usersModel.findOne({email: req.body.email});
      if(!findUserByEmail) return res.status(404).json({msg:'Your email not exist, please first sign-up'});

      const passwordMatches = await bcrypt.compare(req.body.password, findUserByEmail.password);
      if(!passwordMatches) return res.status(400).json({msg:'Password invalid'});

    const initialToken = await jwt.sign({email: findUserByEmail.email, role: findUserByEmail.role, school: findUserByEmail.school, classCode: findUserByEmail.classCode}, process.env.SECRET);
    const token = 'Bearer ' + initialToken;
    res.cookie('authToken', token, {httpOnly: true});
    res.status(200).json({msg:`${findUserByEmail.userName},congratulation you got cookie`});

  }catch (error) {
    next(error);
  }
}

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('authToken');

    res.status(200).json({msg: 'User is logged out'});
  }catch (error) {
    next(error);
  }
}

const createClass = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);

    //check if classCode already exists
    const ifClassCodeFinded = await classesModel.findOne({classCode: req.body.classCode, school: decodedUser.school});
    if(ifClassCodeFinded) {
      throw new Error('This classCode already exists');
     }


    req.body.school=decodedUser.school;
    await classesModel.create(req.body);
    res.status(200).json(`${decodedUser.school} school ,The new course: ${req.body.classCode} successfully added`);

  }catch(error) {
    next(error);
  }

}

const deleteClass = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await classesModel.deleteOne({classCode: req.body.classCode, school: decodedUser.school});
    await usersModel.updateMany({classCode: req.body.classCode,school: decodedUser.school},{$unset: { classCode: 1, school: 1}},{new: true});
    res.status(200).json(`The course: ${req.body.classCode} successfully deleted`);
  }catch(error) {
    next(error);
  }

}

const addTeacher = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.teacher},{$set: { school: decodedUser.school, classCode: req.body.classCode}},{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});

    //const findClass = await classesModel.aggregate([ { $lookup: { from:"users", localField:"classCode", foreignField:"classCode", as:"teachers" } } ])
    res.status(200).json(`the teacher: ${req.body.teacher}, successfully added to classCode:${req.body.classCode}`);
    //console.log(findClass[0].teachers)// findCalss is array
  }catch(error) {
    next(error);
  }

}

const deleteTeacher = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.teacher},{$unset: { school: 1, classCode: 1}},{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the teacher: ${req.body.teacher}, successfully deleted from classCode:${req.body.classCode}`);

  }catch(error) {
    next(error);
  }

}

const updateTeacher = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.teacher},req.body,{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the teacher: ${req.body.teacher}, successfully modified`);

  }catch(error) {
    next(error);
  }

}

const addStudents = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    for (let i = 0; i < req.body.students.length; i++) {
      await usersModel.findOneAndUpdate({userName:req.body.students[i]},{$set: { school: decodedUser.school, classCode: req.body.classCode}},{new: true});
      //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {students:req.body.students[i]}},{new: true});
    }

    //const findClass = await classesModel.aggregate([ { $lookup: { from:"users", localField:"classCode", foreignField:"classCode", as:"teachers" } } ])
    res.status(200).json(`the students: ${req.body.students}, successfully added to classCode:${req.body.classCode}`);
  }catch(error) {
    next(error);
  }

}

const deleteStudent = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.student},{$unset: { school: 1, classCode: 1}},{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the student: ${req.body.student}, successfully deleted from classCode:${req.body.classCode}`);

  }catch(error) {
    next(error);
  }

}

const updateStudent = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.student},req.body,{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the student: ${req.body.student}, successfully modified`);

  }catch(error) {
    next(error);
  }

}




module.exports = {createUser, handeleValidationErrors, loginUser, createClass,addTeacher,deleteClass, deleteTeacher, updateTeacher, addStudents, deleteStudent, updateStudent, logoutUser};
