import React,{Component} from 'react';
import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbare from './components/Navbar';
import AdminPage from './components/adminPage.js';
import {TeacherContainer} from './components/TeacherPage';
import {StudentContainer} from './components/StudentPage';
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

        <Route path="/teacher" exact component={TeacherContainer} />
        <Route path="/student"  exact component={StudentContainer} />

        <Route path="/adminpage"  exact component={AdminPage
        } />

      </BrowserRouter>
    )
  }
}
