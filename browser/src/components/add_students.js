import React,{Component} from 'react';
import './css/add_remove_students.css';
import {addStudentFunction,addStudentTo} from '../redux/redux.js';
import {connect} from 'react-redux';


class AddStudent extends Component{
  constructor(props){
    super(props);
    this.state={showParagraph:false};

  }
  addStudentSubmietd = (ev)=>{
    ev.preventDefault();
    this.setState({showParagraph:true})
    this.props.requestAddStudent({
      nameofstudent:this.props.addstudentValue,
      nameOfClass  :this.props.classBelongStudentAdd
    })

  }

  closeSection = () =>{
    console.log('hi');
    let wrapSection =document.querySelector('.add_student_box');
      wrapSection.style.display='none';
      const classinfo =document.querySelector(".classifno_Cntainer");
      classinfo.style.filter="blur(0)";
}

  render() {
    return(
      <>
      <section className="add_student_box">
        <form onSubmit={this.addStudentSubmietd} >
          <span onClick={this.closeSection} className="close_add_class1">X</span>
          <label className="className_label">name of the student </label><br/>
          <input onChange={this.props.handleChange}   value ={this.props.addstudentValue}    identifier="student" type="text" className="name_class_input "/><br/><br/>
          <label className="className_label">name of class</label><br/>
          <input   onChange={this.props.handleChange}   value ={this.props.classBelongStudentAdd}      type="text" className="name_class_input "/><br/><br/>
          <button type="confirm" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

        </form>
        {this.state.showParagraph && <p className="paragraph_confirm"> you added the student succefully</p>}
      </section>

      </>


    )
  }

}

const mapStateToprops = state =>{
  return{

  addstudentValue:state.addstudentValue,
  classBelongStudentAdd:state.classBelongStudentAdd

  }
}

const mapDispatchToprops = dispatch => {

  return {
    handleChange: ev => dispatch(addStudentFunction(ev)),
    requestAddStudent: addSt => dispatch(addStudentTo(addSt))
  }
}

export const AddstudentCon = connect(mapStateToprops,mapDispatchToprops)(AddStudent)
