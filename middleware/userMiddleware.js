const usersModel = require('../models/usersModel');
const classesModel = require('../models/classesModel');
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
      req.passTemp=req.body.password;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);

      if(req.body.role=='admin') req.body.school=req.body.userName;

      await usersModel.create(req.body);
      req.body.password=req.passTemp;
      //res.status(201).json({msg: `User was created! for ${req.body.userName}`});
      next();// go to login and give token
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
    res.status(200).json({msg:`${findUserByEmail.userName}:${findUserByEmail.role},congratulation you got cookie`, });

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

    const findClass = await classesModel.aggregate([ { $lookup: { from:"users", localField:"classCode", foreignField:"classCode", as:"teachers" } }]);
    console.log(findClass[0].teachers)// findCalss is array

    res.status(200).json(`the teacher: ${req.body.teacher}, successfully added to classCode:${req.body.classCode}`);
    
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
