const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    classCode: {type: String, required: true},
    school: {type: String, required: true},
    trainer: {type: String, default: ''},
    participants: {type: [String], default: []}
},{versionKey:false});

const classesModel= mongoose.model('classes', userSchema);

module.exports= classesModel;
