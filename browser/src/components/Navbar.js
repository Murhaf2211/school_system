import React,{Component} from 'react';


export default class Navbar extends Component{

  render() {
    return(
        <ul>
          <li><a className="active" href="#home">DCI LOGO</a></li>
          <li className="about"><a href="#about">about us</a></li>
        </ul>
      )
    }
  }
