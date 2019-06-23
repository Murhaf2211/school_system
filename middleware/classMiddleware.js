const classesModel = require('../models/classesModel');
const schoolModel = require('../models/schoolModel');
const studentModel = require('../models/studentModel');

const createClass = async(req, res, next)=>{

  try {
    const findSchoolsId = await schoolModel.findOne({userName: req.user.userName}).select('_id');
    req.body.school = findSchoolsId._id;
    await classesModel.create(req.body);

    const findFreshClass = await classesModel.findOne({classCode: req.body.classCode}).select('_id');
    const findRelevantSchool = await schoolModel.findOneAndUpdate({userName: req.user.userName}, {$push: {courses: findFreshClass._id}}, {new: true});

    const populatedSchool = await schoolModel
                                    .findOne({userName: req.user.userName})
                                    .populate({path: 'courses',
                                              select: '-_id -password',
                                              populate: {path: 'participants', select: '-_id -password'}
                                            })
                                    .select('-_id -password')
    return res.status(203).json({msg: 'Success', schoolInfo: populatedSchool});
  }catch(error) {
    next(error);
  }

}

const deleteClass = async(req, res, next)=>{

  try {
    const schoolsId = await schoolModel.findOne({userName: req.user.userName}).select('_id');
    const findClassByClassCode = await classesModel.findOneAndDelete({classCode: req.body.classCode, school: schoolsId._id}).select('_id');
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'});
    }

    console.log(findClassByClassCode);

    const findRelevantSchool = await schoolModel.findOneAndUpdate({userName: req.user.userName}, {$pull: {courses: findClassByClassCode._id}}, {new: true});
    const updatedPopulatedSchool = await schoolModel.findOne({userName: req.user.userName}).populate('courses', '-_id -school ').select('-_id -password');
    return res.status(200).json({msg: 'Success', schoolInfo: updatedPopulatedSchool});

  } catch(error) {
      next(error);
  }
}

module.exports = { createClass, deleteClass };
