import React, { Component } from 'react';
import './App.css';
import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbar from './components/Navbar';
import Teacher from './components/Teacher';
import Student from './components/Student';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Navbar/>
       <Teacher/>
       <Student/>
      </BrowserRouter>
    )
  }
}
