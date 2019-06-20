import {BrowserRouter ,NavLink ,Route ,Redirect} from 'react-router-dom';
import Navbare from './components/Navbar';
import Teacher from './components/TeacherPage';
import Student from './components/StudentPage';
import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginFormContainer} from './components/form';
import SlideImages from './components/SlideImages';
import AdminPage from './components/adminPage';
import ClassInfo from './components/ClassInfo.js';
import ChangeRemoveClass from './components/changeName_removeClass.js';
import {RemoveClass} from './components/changeName_removeClass.js';
import ChangeTeacher from './components/changeTeacher.js';
import  AddStudent from './components/add_reomve_students.js';




export default class App extends Component {
  render() {
    return (
      <>

      <BrowserRouter>

    < Route path ="/" exact component={ LoginFormContainer} />

    < Route path ="/" component={ SlideImages} />
    < Route path ="/adminpage" exact component={ AdminPage} />




       <SlideImages/>

      </BrowserRouter>
      </>
    )
  }
}
