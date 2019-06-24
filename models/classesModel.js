const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    classCode: {type: String, required: true},
    school: {type: mongoose.Schema.ObjectId, required: true, ref: 'schools'},
    trainer: {type: String, default: ''},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'students'}],
    courseEvaluation: [Number],
    trainerEvaluation: [Number]
},{versionKey:false});

const classesModel= mongoose.model('classes', userSchema);

module.exports= classesModel;
