const mongoose= require('mongoose');

const schoolSchema = new mongoose.Schema({
    userName: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true, default: 'School'},
    courses: [ {type: mongoose.Schema.ObjectId, ref: 'classes'}]
},{versionKey:false});

const schoolModel= mongoose.model('schools', schoolSchema);

module.exports= schoolModel;
