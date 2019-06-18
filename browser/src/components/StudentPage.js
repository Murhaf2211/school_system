import React,{Component} from 'react';
import { Card, Button, Jumbotron, ProgressBar, ListGroup, Form} from 'react-bootstrap';
import {LinkedCalendar} from 'rb-datepicker';
import {MDBRow, MDBContainer, MDBCol } from "mdbreact";
import {connect} from 'react-redux';
import {updateTeacherEV, updateCourseEV, updateStudentComnt} from '../redux/redux';


class Student extends Component{

  render() {
    return(
      <section className="mainStyle">
        <Jumbotron className='text-center bg-transparent'>
         <div className='opacity'>
          <h1>Hello, StudentName!</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling
           extra attention to featured content or information.
          </p>
          <p>
            <Button variant="dark">Logout</Button>
          </p><br/>
          </div><br/><br/><br/><br/>
          <MDBContainer>
           <MDBRow>
            <MDBCol md="3"></MDBCol>
            <MDBCol md="6">
            <Form>
              <Form.Group>
                <label htmlFor="customRange1">Course Evaluation</label>
                <div class="d-flex justify-content-center my-6">
                  <span class="font-weight-bold blue-text mr-2 mt-1">0%</span>
                  <form class="range-field w-50">
                  <input onChange={this.props.changeCoursValue} type="range" step="1" className="custom-range" id="customRange1" />
                  </form>
                  <span class="font-weight-bold blue-text ml-2 mt-1">100%</span>
                </div>
                <label htmlFor="customRange1">Teacher Evaluation</label>
                <div class="d-flex justify-content-center my-6">
                  <span class="font-weight-bold blue-text mr-2 mt-1">0%</span>
                  <form class="range-field w-50">
                  <input onChange={this.props.changeValue} type="range" step="1" className="custom-range" id="customRange1" />
                  </form>
                  <span class="font-weight-bold blue-text ml-2 mt-1">100%</span>
                </div>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Your Opinion!</Form.Label>
              <Form.Control onChange={this.props.updateStudentComnt} as="textarea" rows="3" />
              </Form.Group>
              <Button variant="secondary" type="submit">Submit</Button>
             </Form>
           </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Jumbotron>
    </section>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      TeacherEvaluation: state.TeacherEvaluation,
      courseEvaluation: state.courseEvaluation,
      studentComent: state.studentComent
      }
    }
  const mapDispatchToProps = dispatch => {
    return {
      changeValue: ev => dispatch(updateTeacherEV(ev)),
      changeCoursValue: ev => dispatch(updateCourseEV(ev)),
      updateStudentComnt: ev => dispatch(updateStudentComnt(ev))
    }
  }

  export const StudentContainer = connect(mapStateToProps, mapDispatchToProps)(Student)
