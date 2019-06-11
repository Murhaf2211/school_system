import React,{Component} from 'react';
import { Card, Button, Jumbotron, ProgressBar, ListGroup} from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function alertClicked() {
alert('You clicked the third ListGroupItem');
}
export default class Teacher extends Component{


  render() {
    return(
      <section className="mainStyle">
        <Jumbotron className='text-center bg-danger'>
          <h1>Hello, TeacherName!</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling
           extra attention to featured content or information.
          </p>
          <p>
            <Button variant="dark">Logout</Button>
          </p><br/><br/><br/><br/><br/>

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
                Add Coure
              </ListGroup.Item>
            </ListGroup>,

            </MDBCol>
            <MDBCol md="6">
              <ProgressBar>
                <ProgressBar animated variant="success" now={80} key={3} />
              </ProgressBar><br/>
              <ProgressBar>
                <ProgressBar  animated variant="warning" now={50} key={2} />
              </ProgressBar><br/>
              <ProgressBar>
                <ProgressBar animated variant="danger" now={30} key={3} />
              </ProgressBar>
             </MDBCol>
           </MDBRow>
          </MDBContainer>
        </Jumbotron>

      </section>
      )
    }
  }
