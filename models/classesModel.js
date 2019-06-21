const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    classCode: {type: String, required:true},
    //teachers: {type: [String]},
    //participants: {type: [String]},
    school: {type: String}
    
},{versionKey:false});

const classesModel= mongoose.model('classes', userSchema);

module.exports= classesModel;