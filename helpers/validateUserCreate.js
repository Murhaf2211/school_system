const {check}= require('express-validator/check');
const schoolModel = require('../models/schoolModel');
const fieldsMustExist = 'The username, password and role fields must be filled in and cannot be ommited';
const fieldsNecessaryLength = 'The username and the password must be between 8 and 35 characters long';
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

module.exports= { userCreateValidator, possibleRoles };
