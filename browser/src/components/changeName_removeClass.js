import React,{Component} from 'react';
import './changeName_removeClass.css';
import './ClassInfo.css';
import './removeBox.css';



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


export  class RemoveClass extends Component{
  constructor(props){
    super(props);
    this.state={submitet:false}
  }
  closeSection1 = () =>{
    let closeSection =document.querySelector('.removeBox')
    closeSection.style.display='none';
    let classinfo =document.querySelector(".classifno_Cntainer");
    classinfo.style.filter="blur(0)";
  }

  classChangesubmitet = (ev) =>{
    this.setState({submitet:true});


  }


  render() {
    return(
      <>
      <section className="removeBox">
        <form  onSubmit={this.classChangesubmitet.bind(this)} >
          <span onClick={this.closeSection1} className="close_add_class1">X</span>
          <label className="className_label1">wich class do you want to remove?</label><br/>
          <input  type="text" className="name_class_input1 "/><br/><br/>

          <button type="submit" className=" submit_addClass_button1 btn-block"> Confirm</button>

        </form>
        {this.state.submitet && <p className="pargraph_confirm">you have changed the name</p>}
      </section>

      </>
    )

}
}
