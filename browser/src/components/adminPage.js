import React,{Component} from 'react';
import './css/adminPage.css';
import {ModalBoxContainer} from './ModalBox'



export default class AdminPage extends Component{
  constructor(props) {
    super(props);
    this.state = {addClassClicked: false};
  }

addClass(ev){
  this.setState({addClassClicked:true})
}



  render() {
    return(
    <>

    <section className="contanier">

    <section className="classes_box">
       <button type="button" onClick={this.addClass.bind(this)}  className="add_class_button "  data-toggle="modal" data-target="#myModal">add new class</button>

  {this.state.addClassClicked && <ModalBoxContainer/>}

</section>
</section>

  </>



    )
  }
}
