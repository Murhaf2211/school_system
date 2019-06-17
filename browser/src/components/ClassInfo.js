import React,{Component} from 'react';
import './ClassInfo.css';
import {studentsData} from './studentsData.js';
import ChangeRemoveClass,{RemoveClass} from './changeName_removeClass.js';
import ChangeTeacher from './changeTeacher';
import AddStudent,{RemoveStudent} from './add_reomve_students';




export default class ClassInfo extends Component{
  constructor(props){
    super(props);
    this.state={showChangeBox:false,
                showRemoveBox:false,
                showChangeTacherBox:false,
                showAddStudentBox:false,
                showRemoveStudent:false }
  }


closeContanier =() =>{
    const classinfo =document.querySelector(".classifno_Cntainer");
    classinfo.style.display="none";

  }
  addChangeBox= (ev) =>{
      const classinfo =document.querySelector(".classifno_Cntainer");
      classinfo.style.filter="blur(8px)";
     this.setState({showChangeBox:true});

  }
  removeClass= (ev) => {
    this.setState({showRemoveBox:true});
    const classinfo =document.querySelector(".classifno_Cntainer");
    classinfo.style.filter="blur(8px)";

  }
  changeTeacherClicked = () =>{
    console.log('hi');
    this.setState({showChangeTacherBox:true})
    const classinfo =document.querySelector(".classifno_Cntainer");
    classinfo.style.filter="blur(8px)";


  }
  addStudentClicked = () =>{
    this.setState({showAddStudentBox:true})
    const classinfo =document.querySelector(".classifno_Cntainer");
    classinfo.style.filter="blur(8px)";
  }
  removeStudentClicked = () => {
    this.setState({showRemoveStudent:true})
    const classinfo =document.querySelector(".classifno_Cntainer");
    classinfo.style.filter="blur(8px)";
  }

  render(){

  return(
    <>
    <section className="classifno_Cntainer">
    <span  onClick={this.closeContanier}  className="close_classContanier">X</span>



     <section className="right_section">
     <ul className="Titel_students" > <li>Email</li><li>lastName</li> <li>firstName</li> </ul>
      {studentsData.map((item,index)=>{
        return(

        <>
        <section className="students_Deatis">

          <h6>  {item.firstName}</h6>
          <h6>  {item.lastName}</h6>
          <h6>  {item.Email}</h6>

        </section>
       </>
     )
   })}

   </section>

<section className="class_details">
  <div className="every_info_about_class">
      <h4>Class:FB1</h4>
      <div className="teacher_rating"> here is the rating</div>
      <div className="div_for_buttons">   <button onClick={this.addChangeBox}>change the name</button>
      <button onClick={this.removeClass.bind(this)}>remove class</button></div>
    </div>

  <div className="every_info_about_class">
    <h4>Teacher:Kostas</h4>

      <div className="teacher_rating"> here is the rating</div>
    <div className="div_for_buttons">  <button onClick={this.changeTeacherClicked.bind(this)}>change Teacher</button></div>
  </div>

  <div className="every_info_about_class"><h4>Number of students:15 </h4><div className="div_for_buttons">
    <button onClick={this.addStudentClicked.bind(this)}>add student</button>
     <button onClick={this.removeStudentClicked.bind(this)}>remove student</button>
     </div>
  </div>

 </section>


  </section>
  {this.state.showChangeBox && < ChangeRemoveClass/>}
  {this.state.showRemoveBox && < RemoveClass/>}
  {this.state.showChangeTacherBox && < ChangeTeacher/>}
  {this.state.showAddStudentBox && < AddStudent/>}
  {this.state.showRemoveStudent && < RemoveStudent/>}

</>
    )
  }
}
