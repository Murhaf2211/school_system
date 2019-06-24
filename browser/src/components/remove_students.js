import React,{Component} from 'react';
import './css/add_remove_students.css';
import {removeStudentFunction,delStudent} from '../redux/redux.js';
import {connect} from 'react-redux';




 export  class RemoveStudent extends Component{
  constructor(props){
    super(props);
    this.state={showParagraph:false};

  }
  removeStudentSubmitet = (ev)=>{
    ev.preventDefault();
    this.setState({showParagraph:true})
    this.props.requestRemoveStudent({
    student:this.props.removestudentValue,
    class:this.props.classBelongStudentremove

    })

  }

  closeSection = () =>{
    console.log('hi');
    let wrapSection =document.querySelector('.remove_student_box');
      wrapSection.style.display='none';
      const classinfo =document.querySelector(".classifno_Cntainer");
      classinfo.style.filter="blur(0)";
}

  render() {
    return(
      <>
      <section className="remove_student_box">
        <form onSubmit={this.removeStudentSubmitet.bind(this)} >
          <span onClick={this.closeSection} className="close_add_class2">X</span>
          <label className="className_labe2">Name of Student </label><br/>
          <input   onChange={this.props.handleChange} value={this.props.removestudentValue}   identifier='student2' type="text" className="name_class_input2 "/><br/><br/>
          <label className="className_label3">Name of class</label><br/>
          <input      onChange={this.props.handleChange}  value={this.props.classBelongStudentremove}    type="text" className="name_class_input2 "/><br/><br/>
          <button type="confirm" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

        </form>
        {this.state.showParagraph && <p className="paragraph_confirm"> you removed the student succefully</p>}
      </section>

      </>
    )
  }

}
const mapStateToprops = state =>{
  return{

  removestudentValue:state.removestudentValue,
  classBelongStudentremove:state.classBelongStudentremove

  }
}

const mapDispatchToprops = dispatch => {

  return {
    handleChange: ev => dispatch(removeStudentFunction(ev)),
    requestRemoveStudent: removeSt => dispatch(delStudent(removeSt))
  }
}

export const Removstudentcont = connect(mapStateToprops,mapDispatchToprops)(RemoveStudent)
