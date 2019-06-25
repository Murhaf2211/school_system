const mongoose= require('mongoose');

const trainerSchema = new mongoose.Schema({
    userName: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true, default: 'Trainer'}
},{versionKey:false});

const trainerModel= mongoose.model('trainers', trainerSchema);

module.exports= trainerModel;
