const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required:true},
    userName: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true},
    active: {type: Boolean, default: false}

},{versionKey:false});

const usersModel= mongoose.model('users', userSchema);

module.exports= usersModel;