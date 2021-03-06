const schoolModel = require('../models/schoolModel');
const trainerModel = require('../models/trainerModel');
const studentModel = require('../models/studentModel');
const classesModel = require('../models/classesModel');
const { possibleRoles } = require('../helpers/validateUserCreate');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const possibleCollections = [schoolModel, trainerModel, studentModel];

const createUser = async (req, res, next) => {
  try {
    const findIndexCollection = possibleRoles.findIndex(role => role === req.body.role);
    const checkUserName = await possibleCollections[findIndexCollection].findOne({userName: req.body.userName});

    if (checkUserName) {
      return res.status(400).json({msg: 'Username already exists'});
    }

    // req.body.password = await bcrypt.hash(req.body.password, saltRounds);
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

    // const passwordMatches = await bcrypt.compare(req.body.password, findByUserName.password);

    if(req.body.password !== findByUserName.password) {
      return res.status(400).json({msg:'Password invalid'});
    }

  const initialToken = await jwt.sign({userName: findByUserName.userName, role: findByUserName.role}, process.env.SECRET);
  const token = 'Bearer ' + initialToken;
  res.cookie('authToken', token, {httpOnly: true});

  switch(req.body.role) {
    case 'School':
      const allSchoolPopulated = await schoolModel
                                      .findOne({userName: req.body.userName})
                                      .populate(
                                                {path: 'courses',
                                                select: '-_id -password -school',
                                                populate: {path: 'participants',
                                                          select: '-_id -password -class',
                                                          populate: {path: 'posts', select: '-_id post'}
                                                        }
                                              })
                                      .select('-_id -password');

      allSchoolPopulated.courses.forEach(course => {
        course.courseEvaluationAvg = (course.courseEvaluation.reduce((a, b) => a + b, 0)) / course.courseEvaluation.length || 0;
        course.trainerEvaluationAvg = (course.trainerEvaluation.reduce((a, b) => a + b, 0)) / course.trainerEvaluation.length || 0;
      })

      return res.status(200).json({msg: 'Welcome', schoolInfo: allSchoolPopulated});
    case 'Trainer':
    const allClassesPopulated = await classesModel
                                    .find({trainer: req.body.userName})
                                    .populate({path: 'participants',
                                                  select: '-_id -password -class',
                                                  populate: {path: 'posts', select: '-_id post'
                                                }
                                            })
                                    .select('-_id -password');
    console.log(allClassesPopulated);

    allClassesPopulated.forEach(course => {
      course.courseEvaluationAvg = (course.courseEvaluation.reduce((a, b) => a + b, 0)) / course.courseEvaluation.length || 0;
      course.trainerEvaluationAvg = (course.trainerEvaluation.reduce((a, b) => a + b, 0)) / course.trainerEvaluation.length || 0;
    })
      return res.status(200).json({msg: 'Welcome', trainersInfo: allClassesPopulated});
    case 'Student':
      const studentInfo = await studentModel.findOne({userName: req.body.userName})
                                                        .populate({path: 'class',
                                                                  select: '-_id trainer classCode participants',
                                                                  populate: {path: 'participants',
                                                                            select: '-_id userName posts',
                                                                            populate: {path: 'posts',
                                                                                      select: '-_id post'
                                                                                    }
                                                                                  }
                                                                              })
                                                        .select('-_id -password -posts');
      return res.status(200).json({msg: 'Welcome', studentsInfo: studentInfo});
  }

  }catch (error) {
    next(error);
  }
}

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('authToken');

    return res.status(200).json({msg: 'You are logged out succesfully!'});
  }catch (error) {
    next(error);
  }
}

module.exports = {createUser, loginUser, logoutUser};
