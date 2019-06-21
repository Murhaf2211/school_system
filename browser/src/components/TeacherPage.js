import React,{Component} from 'react';
import { Card, Button, Jumbotron, ProgressBar, ListGroup, Form} from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from 'react-redux';
import { fetchFrom } from '../redux/redux.js';
import {updateAVcourseEV, updateAVteacherEV} from '../redux/redux';


class Teacher extends Component{

componentDidMount(){
  this.props.makeFetch();
  }

  render() {
    return(
      <>
      <section>
        <Jumbotron className='text-center bg-transparent '>
          <div className='opacity'><br/>
            <h1>Hello, TeacherName!</h1>
            <p >This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p><br/><br/>
          </div><br/><br/>
        <MDBContainer>
          <MDBRow center>
              <MDBCol className='opacity' size="4">
                <Form.Label as="legend" column sm={5}> Course Evaluation </Form.Label>
                <ProgressBar>
                  <ProgressBar animated variant="dark" now={this.props.averageCourseEV} key={3} />{this.props.averageCourseEV}%
                </ProgressBar><br/>
                <Form.Label as="legend" column sm={5}> Teacher Evaluation </Form.Label>
                <ProgressBar>
                  <ProgressBar  animated variant="danger" now={this.props.averageTeacherEV} key={2} />{this.props.averageTeacherEV}%
                </ProgressBar><br/>
               </MDBCol>
            <MDBCol size="4">
              <ListGroup as="ul">
                <ListGroup.Item variant="dark" as="li" >Course Name</ListGroup.Item>
                <ListGroup.Item as="li">FBW1</ListGroup.Item>
                <ListGroup.Item as="li"></ListGroup.Item>
              </ListGroup>
            </MDBCol>
            <MDBCol size="4">
              <ListGroup as="ul">
                <ListGroup.Item variant="dark"as="li" >Students List</ListGroup.Item>
                <ListGroup.Item as="li">Muham suba</ListGroup.Item>
                <ListGroup.Item as="li">Jack mari</ListGroup.Item>
                <ListGroup.Item as="li">Dani fad</ListGroup.Item>
                <ListGroup.Item as="li"></ListGroup.Item>
              </ListGroup>
            </MDBCol>
          </MDBRow><br/><br/>

          </MDBContainer>
        </Jumbotron>
        </section>
      </>
      )
     }
    }

  const mapStateToProps = state => {
    return {
      myData: state.dataFromServer,
      averageCourseEV: state.averageCourseEV,
      averageTeacherEV: state.averageTeacherEV
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      makeFetch: () => dispatch(fetchFrom())
    }
  }

export const TeacherContainer = connect(mapStateToProps, mapDispatchToProps)(Teacher);
