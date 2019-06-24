import React,{Component} from 'react';
import './css/changeName_removeClass.css';
import './css/ClassInfo.css';
import './css/removeBox.css';
import   {deleteClassFunction,delClass} from   '../redux/redux.js';
import {connect} from 'react-redux';





 class RemoveClass extends Component{
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

  classRemoveSUbmited = (ev) =>{
    ev.preventDefault()
    this.setState({submitet:true});
    this.props.requestdeleteClass({
    deleteclass:this.props.deleteClassValue


    })
  }

  render() {
    return(
      <>
      <section className="removeBox">
        <form  onSubmit={this.classRemoveSUbmited} >
          <span onClick={this.closeSection1} className="close_add_class1">X</span>
          <label className="className_label1">Name of Class </label><br/>
          <input  onChange={this.props.handleChange}  value={this.props.deleteClassValue}  type="text" className="name_class_input1 "/><br/><br/>

          <button type="submit" className=" submit_addClass_button1 btn-block"> Delete</button>

        </form>
        {this.state.submitet && <p className="pargraph_confirm">you have changed the name</p>}
      </section>

      </>
    )

}
}

const mapStateToprops = state =>{
  return{

  deleteclass:state.deleteClassValue
  }
}

const mapDispatchToprops = dispatch => {

  return {
    handleChange: ev => dispatch(deleteClassFunction(ev)),
    requestdeleteClass: removeClass => dispatch(delClass(removeClass))
  }
}

export  const Removeclasscont = connect(mapStateToprops,mapDispatchToprops)(RemoveClass)
