const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'evaluations'},
    classCode: {type: String, required: true},
    school: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'schools'},
    trainer: {type: String, default: ''},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'students'}],
    courseEvaluation: [Number],
    trainerEvaluation: [Number],
    courseEvaluationAvg: Number,
    trainerEvaluationAvg: Number
},{versionKey:false});

const classesModel= mongoose.model('classes', userSchema);

module.exports= classesModel;
