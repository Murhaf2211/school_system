const studentModel = require('../models/studentModel');
const postsModel = require('../models/postsModel');

const createPost = async (req, res, next) => {
  try {
    const findAuthor = await studentModel.findOne({userName: req.user.userName});
    req.body.author = findAuthor._id;
    await postsModel.create(req.body);
    const freshPostFound = await postsModel.findOne({post: req.body.post, author: findAuthor._id});
    await studentModel.findOneAndUpdate({userName: req.user.userName}, {$push: {posts: freshPostFound._id}});
    return res.status(200).json({msg: 'Success', posts: freshPostFound.post});
  }catch(error) {
    next(error);
  }
}

module.exports = { createPost };
