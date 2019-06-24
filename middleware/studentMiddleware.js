const classesModel = require('../models/classesModel');
const studentModel = require('../models/studentModel');
const schoolModel = require('../models/schoolModel');

const addStudent = async(req, res, next)=>{

  try {
    const findParticipantToAdded = await studentModel.findOne({userName: req.body.student}).select('_id');
    const findSchool = await schoolModel.findOne({userName: req.user.userName}).select('_id');
    const findClassByClassCode = await classesModel.findOneAndUpdate({
      classCode: req.body.classCode,
      school: findSchool._id
    },
    {$push: {participants: findParticipantToAdded._id}},
    {new: true})

    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }
    await studentModel.findOneAndUpdate({userName: req.body.student}, {$set: {class: findClassByClassCode._id}});
    const allSchoolPopulated = await schoolModel
                                    .findOne({userName: req.user.userName})
                                    .populate({path: 'courses',
                                              select: '-_id -password -school',
                                              populate: {path: 'participants', select: '-_id -password -class'}
                                            })
                                    .select('-_id -password');
    return res.status(201).json({msg: 'Class has been updated', actualClass: allSchoolPopulated});

  }catch(error) {
    next(error);
  }

}

const deleteStudent = async(req, res, next)=>{

  try {
    const participantToBeRemoved = await studentModel.findOne({userName: req.body.student}).select('_id');
    const findSchool = await schoolModel.findOne({userName: req.user.userName}).select('_id');
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: findSchool._id}, {$pull: {participants: participantToBeRemoved._id}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }
    await studentModel.findOneAndUpdate({userName: req.body.student}, {$unset: {class: 1}});
    const allSchoolPopulated = await schoolModel
                                    .findOne({userName: req.user.userName})
                                    .populate({path: 'courses',
                                              select: '-_id -password -school',
                                              populate: {path: 'participants', select: '-_id -password'}
                                            })
                                    .select('-_id -password');
    return res.status(201).json({
      msg: `The student ${req.body.student} was removed from the class ${req.body.classCode}`,
      schoolInfo: allSchoolPopulated
    });

  }catch(error) {
    next(error);
  }

}

module.exports = { addStudent, deleteStudent };
