const classesModel = require('../models/classesModel');
const trainerModel = require('../models/trainerModel');

const createClass = async(req, res, next)=>{

  try {

    const findTrainer = await trainerModel.findOne({userName: req.body.trainer});
    if (!findTrainer) {
      return res.status(400).json({msg: 'The trainer you provided is not registered in our platform'});
    }
    const ifClassCodeFinded = await classesModel.findOne({classCode: req.body.classCode, school: req.user.userName});

    if(ifClassCodeFinded) {
      return res.status(400).json({msg:'This classCode already exists, please give your class another name'});
     }

    req.body.school= req.user.userName;
    await classesModel.create(req.body);
    return res.status(200).json(`${req.user.userName} school ,The new course: ${req.body.classCode} was successfully created`);

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

module.exports = { createClass, deleteClass };
