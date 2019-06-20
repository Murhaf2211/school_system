import React,{Component} from 'react';
import { Navbar, Nav, Form, FormControl,Button } from 'react-bootstrap';
import atmo from '../img/atmo.png'


export default class Navbare extends Component{

  render() {
    return(
    <>
     <Navbar sticky="top" bg="dark" variant="dark">
      <img src={atmo} className="navLogo"/>
      <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">About US</Nav.Link>
      <Nav.Link href="#pricing">Contact</Nav.Link>
      </Nav>
      <Form inline>
       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
       <Button variant="outline-info">Search</Button>
      </Form>
     </Navbar>
  </>

      )
    }
  }
