const classesModel = require('../models/classesModel');

const addStudent = async(req, res, next)=>{

  try {
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: req.user.userName}, {$push: {participants: req.body.student}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }

    return res.status(201).json({msg: `The student ${req.body.student} was added to the class ${req.body.classCode}`});

  }catch(error) {
    next(error);
  }

}

const deleteStudent = async(req, res, next)=>{

  try {
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: req.user.userName}, {$pull: {participants: req.body.student}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }

    return res.status(201).json({msg: `The student ${req.body.student} was removed from the class ${req.body.classCode}`});

  }catch(error) {
    next(error);
  }

}

module.exports = { addStudent, deleteStudent };
