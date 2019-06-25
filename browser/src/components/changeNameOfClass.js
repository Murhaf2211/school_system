import React,{Component} from 'react';
import './css/changeName_removeClass.css';
import './css/ClassInfo.css';
import './css/removeBox.css';







export default class ChangeRemoveClass extends Component {


   closeSection= ()=> {
     let wrapsection= document.querySelector('.add_class_section');
     wrapsection.style.display='none';

     let classInfoApperAgain =document.querySelector('.classifno_Cntainer');
     classInfoApperAgain.style.filter="blur(0)";
   }
   classChangesubmitet =(ev) =>{
     console.log('submitet');
   }

  render()    {

  return(
    <>
    <section className="add_class_section">
      <form  onSubmit={this.classChangesubmitet.bind(this)} >
        <span onClick={this.closeSection} className="close_add_class">X</span>
        <label className="className_label">put the old Name</label><br/>
        <input  type="text" className="name_class_input "/><br/><br/>
        <label className="className_label">put the new Name</label><br/>
        <input type="text" className="name_Teacher_input " placeholder="new name" /><br/><br/><br/>
        <button type="submit" className=" submit_addClass_button btn-secondary  btn-block"> Submit</button>

      </form>
    </section>

    </>


    )
  }
}
