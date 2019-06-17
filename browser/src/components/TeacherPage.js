import React,{Component} from 'react';
import { Card, Button, Jumbotron, ProgressBar, ListGroup, Form} from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Background from '../img/students3.jpg';


function alertClicked() {
alert('You clicked the third ListGroupItem');
}
export default class Teacher extends Component{


  render() {
    return(
      <>
      <section>
        <Jumbotron className='text-center bg-transparent '>
        <div className='opacity'>
          <h1>Hello, TeacherName!</h1>
          <p >This is a simple hero unit, a simple jumbotron-style component for calling
           extra attention to featured content or information.
          </p>
          <p>
            <Button variant="dark">Logout</Button>
          </p><br/>
          </div><br/><br/><br/><br/>

          <MDBContainer>
           <MDBRow>
            <MDBCol md="3">
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item variant="secondary"action href="#link1" disabled>
                  Students List
                </ListGroup.Item>
                <ListGroup.Item action href="#link2" disabled>

                </ListGroup.Item>
                <ListGroup.Item action onClick={alertClicked}>
                  Add Student
                </ListGroup.Item>
              </ListGroup>,
            </MDBCol>
            <MDBCol md="3">
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item variant="secondary"action href="#link1" disabled>
                My Courses List
              </ListGroup.Item>
              <ListGroup.Item action href="#link2" disabled>

              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Add Course
              </ListGroup.Item>
            </ListGroup>,

            </MDBCol>
            <MDBCol className='opacity' md="6">
              <Form.Label as="legend" column sm={5}> Course Evaluation </Form.Label>
              <ProgressBar>
                <ProgressBar animated variant="success" now={80} key={3} />
              </ProgressBar><br/>
              <Form.Label as="legend" column sm={5}> Teacher Evaluation </Form.Label>
              <ProgressBar>
                <ProgressBar  animated variant="warning" now={50} key={2} />
              </ProgressBar><br/>

             </MDBCol>
           </MDBRow>
          </MDBContainer>
        </Jumbotron>
        </section>
</>

      )
    }
  }
