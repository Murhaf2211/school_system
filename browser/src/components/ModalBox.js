import React,{Component} from 'react';
import ClassInfo from './ClassInfo.js'

import './css/ModalBox.css';



export default class ModalBox extends Component{
  constructor(props) {
    super(props);
    this.state = {allclasses:[],
                  inputTeacher:'',
                  inputClass:'',
                  submitClicked:false,
                  pharagraphCliecd:false,
                   };
     }
     closeSection = ()=> {
       let wrapSection =document.querySelector('.add_class_section')
       wrapSection.style.display="none";
     }

     submitCreated(ev){
       ev.preventDefault();
       let emptyObject ={NameOfClass:this.state.inputClass,TeachersName:this.state.inputTeacher}
       let newArray =[...this.state.allclasses]
       newArray.push(emptyObject)
       this.setState({submitClicked:true,allclasses:newArray,inputTeacher:'',inputClass:''});
       console.log(newArray);
       let wrapSection =document.querySelector('.add_class_section')
    setTimeout( ()=> {    wrapSection.style.display="none" }, 1500);


     }
     techerfunc(ev){
       this.setState({inputTeacher:ev.target.value})

   }
   classfun(ev){
    this.setState({inputClass:ev.target.value})
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
              <form onSubmit={this.submitCreated.bind(this)}>
                <span onClick={this.closeSection} className="close_add_class">X</span>
                <label className="className_label">Name the Teacher</label><br/>
                <input type="text" className="name_class_input " onChange={this.techerfunc.bind(this)} value={this.state.inputTeacher}/><br/><br/>
                <label className="className_label">Name The Class</label><br/>
                <input type="text" className="name_Teacher_input " onChange={this.classfun.bind(this)} value={this.state.inputClass}/><br/><br/><br/>
                <button type="submit" className=" submit_addClass_button "> Submit</button>
                {this.state.submitClicked && <p className="create_new_class ">you created a new class successfully</p>}
              </form>

        </section>
        <section className="content_section">
                {this.state.allclasses.map((item,index)=>{
              return(
                    <p  key={index} className="paragraph" onClick={this.classIsClicked.bind(this)} >{item.NameOfClass}</p>
                       )
})}
            </section>
            {this.state.pharagraphCliecd && <ClassInfo/>}
         </>



    )

}

}
