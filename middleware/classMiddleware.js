const classesModel = require('../models/classesModel');

const createClass = async(req, res, next)=>{

  try {
    req.body.school= req.user.userName;
    await classesModel.create(req.body);
    return res.status(200).json(`${req.user.userName} school ,The new course: ${req.body.classCode} was successfully created`);
  }catch(error) {
    next(error);
  }

}

const deleteClass = async(req, res, next)=>{

  try {
    const classToBeDeleted = await classesModel.findOneAndDelete({classCode: req.body.classCode, school: req.user.userName});
    if (classToBeDeleted) {
      return res.status(203).json({msg: `The course: ${req.body.classCode} from the ${req.user.userName} school was successfully deleted`});
    }

    return res.status(404).json({msg: 'The class you provided does not exist within your school.'});

  } catch(error) {
      next(error);
  }
}

module.exports = { createClass, deleteClass };
