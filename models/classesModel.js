const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    classCode: {type: String, required:true},
    school: {type: String, required: true}
},{versionKey:false});

const classesModel= mongoose.model('classes', userSchema);

module.exports= classesModel;
