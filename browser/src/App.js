import React, { Component } from 'react';
import './App.css';
import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbare from './components/Navbar';
import Teacher from './components/TeacherPage';
import Student from './components/StudentPage';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Navbare/>
       <Teacher/>
       <Student/>
      </BrowserRouter>
    )
  }
}
