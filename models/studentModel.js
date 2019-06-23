const mongoose= require('mongoose');

const studentSchema = new mongoose.Schema({
    userName: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true, default: 'Student'},
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'classes'}
},{versionKey:false});

const studentModel= mongoose.model('students', studentSchema);

module.exports= studentModel;
