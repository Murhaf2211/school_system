const deleteTrainer = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.teacher},{$unset: { school: 1, classCode: 1}},{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the teacher: ${req.body.teacher}, successfully deleted from classCode:${req.body.classCode}`);

  }catch(error) {
    next(error);
  }

}

const updateTrainer = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.teacher},req.body,{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the teacher: ${req.body.teacher}, successfully modified`);

  }catch(error) {
    next(error);
  }

}

module.exports = { deleteTrainer , updateTrainer }
