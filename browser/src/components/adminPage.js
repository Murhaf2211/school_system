import React,{Component} from 'react';
import './adminPage.css';
import ModalBox from './ModalBox'



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
       <button type="button" onClick={this.addClass.bind(this)}  className="add_class_button btn btn-secondary"  data-toggle="modal" data-target="#myModal">add class</button>

  {this.state.addClassClicked && <ModalBox/>}





  </section>
</section>




    </>


    )
  }
}
