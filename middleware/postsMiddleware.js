const studentModel = require('../models/studentModel');
const postsModel = require('../models/postsModel');
const classesModel = require('../models/classesModel');

const createPost = async (req, res, next) => {
  try {
    const findAuthor = await studentModel.findOne({userName: req.user.userName});
    req.body.author = findAuthor._id;
    await postsModel.create(req.body);
    const freshPostFound = await postsModel.findOne({post: req.body.post, author: findAuthor._id});
    await studentModel.findOneAndUpdate({userName: req.user.userName}, {$push: {posts: freshPostFound._id}}, {new: true});
    console.log(findAuthor.class);
    const classStudentBelongsTo = await classesModel.findOneAndUpdate(
      {_id: findAuthor.class},
      {$push: {courseEvaluation: parseInt(req.body.courseEvaluation), trainerEvaluation: parseInt(req.body.trainerEvaluation)}
    });
    return res.status(200).json({msg: 'Success', posts: freshPostFound.post});
  }catch(error) {
    next(error);
  }
}

module.exports = { createPost };
