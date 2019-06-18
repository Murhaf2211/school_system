import React,{Component} from 'react';
import './changeTeacher.css'




export default class ChangeTeacher extends Component{

constructor(props){
  super(props);
  this.state={showParagraph:false}
}

  changeTeacherSubmitet = (ev)=>{
    ev.preventDefault();
    console.log('submit');
    this.setState({showParagraph:true})
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
      <form  onSubmit={this.changeTeacherSubmitet.bind(this)} >
        <span onClick={this.closeSection} className="close_add_class">X</span>
        <label className="className_label">put the Name of the New Teacher</label><br/>
        <input  type="text" className="name_class_input "/><br/><br/>
        <button type="confirm" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

      </form>
      {this.state.showParagraph && <p className="paragraph_confirm"> you changed the Teacher succefully</p>}
    </section>

    </>
  )
}


}
