import React,{Component} from 'react';
import './css/changeTeacher.css';
import {updateTeacher,changeTeacherFunction} from '../redux/redux.js';
import {connect} from 'react-redux';




 class ChangeTeacher extends Component{

constructor(props){
  super(props);
  this.state={showParagraph:false}
}

  changeTeacherSubmitet = (ev)=>{
    ev.preventDefault();
    console.log('submit');
    this.setState({showParagraph:true});

    this.props.makeRequestForUpdateTeacher({
      changeTeacher:this.props.changeTeacherVaule
    })
  }
  closeSection = () =>{
    let wrapSection =document.querySelector('.change_teacher_box');
      wrapSection.style.display='none';
      let classInfoApperAgain =document.querySelector('.classifno_Cntainer');
      classInfoApperAgain.style.filter="blur(0)";

  }
render(){
  return(
    <>

    <section className="change_teacher_box">
      <form  onSubmit={this.changeTeacherSubmitet} >
        <span onClick={this.closeSection} className="close_add_class">X</span>
        <label className="className_label">put the Name of the New Teacher</label>
        <input  type="text"     onChange={this.props.handleChange}  value ={this.props.changeTeacherVaule}     className="name_class_input "/>
        <button type="confirm" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

      </form>
      {this.state.showParagraph && <p className="paragraph_confirm"> you changed the Teacher succefully</p>}
    </section>

   </>
  )
}


}


const mapStateToprops = state => {
  return{
    changeTeacherVaule:state.changeTeacherVaule
  }
}


const mapDispatchToprops = dispatch =>{
  return {

    handleChange: ev => dispatch(changeTeacherFunction(ev)),
    makeRequestForUpdateTeacher:ev => dispatch(updateTeacher(ev))

  }

}

export const TeacherContanier = connect(mapStateToprops,mapDispatchToprops)(ChangeTeacher);
