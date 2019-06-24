const classesModel = require('../models/classesModel');
const schoolModel = require('../models/schoolModel');

const deleteTrainer = async(req, res, next)=>{

  try {
    const findSchool = await schoolModel.findOne({userName: req.user.userName}).select('_id');
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: findSchool._id}, {$set: {trainer: ''}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }

    const populatedSchool = await schoolModel
                                    .findOne({userName: req.user.userName})
                                    .populate({path: 'courses',
                                              select: '-_id -password -school',
                                              populate: {path: 'participants',
                                                        select: '-_id -password -class',
                                                        populate: {path: 'posts', select: '-_id post'}
                                                    }
                                            })
                                    .select('-_id -password')

    return res.status(203).json({msg: 'The trainer was removed from the given class', schoolInfo: populatedSchool});

  }catch(error) {
    next(error);
  }

}

const updateTrainer = async(req, res, next)=>{

  try {
    const findSchool = await schoolModel.findOne({userName: req.user.userName}).select('_id');
    const findClassByClassCode = await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: findSchool._id}, {$set: {trainer: req.body.trainer}}, {new: true});
    if (!findClassByClassCode) {
      return res.status(404).json({msg: 'The class you provided does not exist within your school'})
    }

    const populatedSchool = await schoolModel
                                    .findOne({userName: req.user.userName})
                                    .populate({path: 'courses',
                                              select: '-_id -password -school',
                                              populate: {path: 'participants',
                                                        select: '-_id -password -class',
                                                        populate: {path: 'posts', select: '-_id post'}
                                                    }
                                            })
                                    .select('-_id -password')

    return res.status(203).json({msg: 'The trainer was updated', schoolInfo: populatedSchool});

  }catch(error) {
    next(error);
  }

}

module.exports = { deleteTrainer , updateTrainer }
