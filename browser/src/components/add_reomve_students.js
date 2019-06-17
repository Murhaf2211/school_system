import React,{Component} from 'react';
import './add_remove_students.css';


export default class AddStudent extends Component{
  constructor(props){
    super(props);
    this.state={showParagraph:false};

  }
  addStudentSubmietd = (ev)=>{
    ev.preventDefault();
    this.setState({showParagraph:true})

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
        <form onSubmit={this.addStudentSubmietd.bind(this)} >
          <span onClick={this.closeSection} className="close_add_class1">X</span>
          <label className="className_label">firstName </label><br/>
          <input  type="text" className="name_class_input "/><br/><br/>
          <label className="className_label">lastName</label><br/>
          <input  type="text" className="name_class_input "/><br/><br/>
          <button type="confirm" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

        </form>
        {this.state.showParagraph && <p className="paragraph_confirm"> you added the student succefully</p>}
      </section>

      </>
    )
  }

}

export  class RemoveStudent extends Component{
  constructor(props){
    super(props);
    this.state={showParagraph:false};

  }
  removeStudentSubmitet = (ev)=>{
    ev.preventDefault();
    this.setState({showParagraph:true})

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
          <label className="className_labe2">firstName </label><br/>
          <input  type="text" className="name_class_input2 "/><br/><br/>
          <label className="className_label3">lastName</label><br/>
          <input  type="text" className="name_class_input2 "/><br/><br/>
          <button type="confirm" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

        </form>
        {this.state.showParagraph && <p className="paragraph_confirm"> you removed the student succefully</p>}
      </section>

      </>
    )
  }

}
