const addStudent = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    for (let i = 0; i < req.body.students.length; i++) {
      await usersModel.findOneAndUpdate({userName:req.body.students[i]},{$set: { school: decodedUser.school, classCode: req.body.classCode}},{new: true});
      //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {students:req.body.students[i]}},{new: true});
    }

    //const findClass = await classesModel.aggregate([ { $lookup: { from:"users", localField:"classCode", foreignField:"classCode", as:"teachers" } } ])
    res.status(200).json(`the students: ${req.body.students}, successfully added to classCode:${req.body.classCode}`);
  }catch(error) {
    next(error);
  }

}

const deleteStudent = async(req, res, next)=>{

  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);
    await usersModel.findOneAndUpdate({userName:req.body.student},{$unset: { school: 1, classCode: 1}},{new: true});
    //const findClass =await classesModel.findOneAndUpdate({classCode: req.body.classCode, school: decodedUser.school},{$push: {teachers:req.body.teacher}},{new: true});
    res.status(200).json(`the student: ${req.body.student}, successfully deleted from classCode:${req.body.classCode}`);

  }catch(error) {
    next(error);
  }

}

module.exports = { addStudent, deleteStudent };
