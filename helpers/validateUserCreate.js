const {check}= require('express-validator/check');
const trainerModel = require('../models/trainerModel');
const classesModel = require('../models/classesModel');
const studentModel = require('../models/studentModel');
const fieldsMustExist = 'All fields must be filled in and cannot be ommited';
const fieldsNecessaryLength = 'The username and the password must be between 6 and 35 characters long';
const possibleRoles = ['School', 'Trainer', 'Student'];

const userCreateValidator= [

    check(['userName', 'password', 'role']).exists().not().isEmpty().withMessage(fieldsMustExist),
    check(['userName', 'password']).trim()
      .isLength({min: 6, max: 50}).withMessage(fieldsNecessaryLength)
      .escape(),
    check('role').custom(roleProvided => {
      if (!possibleRoles.includes(roleProvided)) {
        throw new Error('Please choose a suitable role of either School, trainer or Student');
      } else {
        return true;
      }
    })

];

const validateClassCreation = [
  check(['classCode', 'trainer']).exists().not().isEmpty().withMessage(fieldsMustExist)
    .trim()
    .escape(),

  check('trainer').custom(async (trainersName) => {
    const findTrainer = await trainerModel.findOne({userName: trainersName});
    if (!findTrainer) {
      throw new Error('The trainer with the given username is not registered in our platform')
    } else {
      return true;
    }
  }),

  check('classCode').custom(async (givenClassCode) => {
    const findClassByCode = await classesModel.findOne({classCode: givenClassCode});
    if (findClassByCode) {
      throw new Error('The class with the given class code exists. Please name your class differently');
    } else {
      return true;
    }
  })

]

const validateClassDelete = [
  check('classCode').exists().not().isEmpty().withMessage(fieldsMustExist)
    .trim()
    .escape()
]

const validateStudentAddition = [
  check(['classCode', 'student']).exists().not().isEmpty().withMessage(fieldsMustExist)
    .trim()
    .escape(),

  check('student').custom(async (studentsName) => {
    const findStudent = await studentModel.findOne({userName: studentsName});
    if (!findStudent) {
      throw new Error('The student with the given username is not registered in our platform')
    } else {
      return true;
    }
  })
]

const validatePostCreate = [
  check('post').exists().not().isEmpty().withMessage('Fill all the fields in')
    .trim()
    .isLength({min: 1}).withMessage('It seems that you have written nothing')
    .escape()
]

const validateUpdateTrainer = [...validateClassCreation];
validateUpdateTrainer.pop();


module.exports= { userCreateValidator,
                  possibleRoles,
                  validateClassCreation,
                  validateClassDelete,
                  validateUpdateTrainer,
                  validateStudentAddition,
                  validatePostCreate
                };
