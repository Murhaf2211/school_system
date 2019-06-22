import React,{Component} from 'react';
import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbare from './components/Navbar';
import {TeacherContainer} from './components/TeacherPage';
import {StudentContainer} from './components/StudentPage';
import logo from './logo.svg';
import './App.css';
import Form from './components/form';
import SlideImages from './components/SlideImages';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/"  component={Navbare}/>
        <Route path="/"  component={Form}/>
        <Route path="/"  component={SlideImages}/>
        <Route path="/teacher" exact component={TeacherContainer} />
        <Route path="/student"  exact component={StudentContainer} />

      </BrowserRouter>
    )
  }
}
