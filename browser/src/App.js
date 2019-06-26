import React,{Component} from 'react';
import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbare from './components/Navbar';
import AdminPage from './components/adminPage';
import {TeacherContainer} from './components/TeacherPage';
import {StudentContainer} from './components/StudentPage';
import Footer from './components/footer';
import logo from './logo.svg';
import './App.css';
import {LoginFormContainer} from './components/form.js';
import SlideImages from './components/SlideImages';
import ClassInfo from './components/ClassInfo';


export default class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <Route path="/"  component={SlideImages}/>
        <Route path="/"  component={Navbare}/>
        <Route path="/" exact component={LoginFormContainer}/>
        <Route path="/teacher" exact component={TeacherContainer} />
        <Route path="/student"  exact component={StudentContainer} />
        <Route path="/adminpage"  exact component={AdminPage} />
        <Route path="/"  component={Footer}/>
      </BrowserRouter>

        )
  }
}
