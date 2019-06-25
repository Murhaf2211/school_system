const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  post: {type: String, required: true},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'students' }
}, {versionKey: false})

const postsModel = mongoose.model('posts', postsSchema);

module.exports = postsModel;
