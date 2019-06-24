import React,{Component} from 'react';
import { Navbar, Nav, Form, FormControl,Button } from 'react-bootstrap';
import atmo3 from '../img/atmo3.png'


export default class Navbare extends Component{

  render() {
    return(
      <>
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand>
            <img src={atmo3} className="d-inline-block align-top"
            height= "60"
            />
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Navbar bg="dark" variant="dark">
          <Form inline>
            <Button variant="outline-danger" type="submit">Logout</Button>
          </Form>
            </Navbar>
        </Navbar>
        </>
      )
    }
  }
