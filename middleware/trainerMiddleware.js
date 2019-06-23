const classesModel = require('../models/classesModel');

const deleteTrainer = async(req, res, next)=>{

  try {
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: req.user.userName}, {$set: {trainer: ''}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }
    res.status(203).json(`The trainer was successfully removed from  class with code:${req.body.classCode}`);

  }catch(error) {
    next(error);
  }

}

const updateTrainer = async(req, res, next)=>{

  try {
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: req.user.userName}, {$set: {trainer: req.body.trainer}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }
    res.status(203).json(`You have succesfully changed trainer in the  class with code:${req.body.classCode}`);

  }catch(error) {
    next(error);
  }

}

module.exports = { deleteTrainer , updateTrainer }
