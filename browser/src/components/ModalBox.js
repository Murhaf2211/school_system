import React,{Component} from 'react';
import ClassInfo from './ClassInfo.js'
import './css/ModalBox.css';
import   {addClassFunction,newClass} from '../redux/redux.js';
import {connect} from 'react-redux';



 class ModalBox extends Component{

     closeSection = ()=> {
       let wrapSection =document.querySelector('.add_class_section')
       wrapSection.style.display="none";
     }

     submitCreated= (ev) =>{
       ev.preventDefault();
      this.props.makeRequestForNewClass({
         NameOfNewClass:this.props.NameOfNewClassValue,
         NameOfNewTeacher:this.props.NameOfNewTeacherValue

       })





     }




   classIsClicked(ev){
     console.log('hallo');
     this.setState({pharagraphCliecd:true})

   }

  render() {
    return(
         <>
        <link href="https://fonts.googleapis.com/css?family=Mali&display=swap" rel="stylesheet"/>
            <section className="add_class_section">
               <form onSubmit={this.submitCreated}>

                <span onClick={this.closeSection} className="close_add_class">X</span>

                <label className="className_label">Name of class</label><br/>
                <input type="text" identifier="first" className="name_class_input " onChange={this.props.handleChange} value={this.props.NameOfNewClassValue}/><br/><br/>
                <label className="className_label">Name of Teacher</label><br/>
                <input type="text" identifier="second" className="name_Teacher_input " onChange={this.props.handleChange} value={this.props.NameOfNewTeacherValue}/><br/><br/><br/>
                <button type="submit" className=" submit_addClass_button "> Submit</button>

              </form>

        </section>
    {/*      <section className="content_section">
             {this.state.allclasses.map((item,index)=>{
              return(
                    <p  key={index} className="paragraph" onClick={this.classIsClicked.bind(this)} >{item.NameOfClass}</p>
                       )
})} */}



         </>

    )
}
}




const mapStateToprops = state =>{
  return{
    NameOfNewClassValue:state.NameOfNewClassValue,
    NameOfNewTeacherValue:state.NameOfNewTeacherValue

  }
}

const mapDispatchToprops =dispatch =>{
  return{
    handleChange:ev => dispatch(addClassFunction(ev)),
    makeRequestForNewClass:addClass => dispatch(newClass(addClass))
  }
}

export const  ModalBoxContainer = connect(mapStateToprops,mapDispatchToprops)(ModalBox);
