import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbare from './components/Navbar';
import Teacher from './components/TeacherPage';
import Student from './components/StudentPage';
import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SlideImages from './components/SlideImages';










export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Navbare/>
       <SlideImages />
       <Teacher/>
       <Student/>

      </BrowserRouter>
    )
  }
}
