const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required:true},
    userName: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true},
    school: {type: String},
    classCode: {type: String}
    
},{versionKey:false});

const usersModel= mongoose.model('users', userSchema);

module.exports= usersModel;