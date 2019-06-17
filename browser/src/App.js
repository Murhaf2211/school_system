import React,{Component} from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Form from './components/form';
import Navbar from './components/Navbar';
import SlideImages from './components/SlideImages';
import AdminPage from './components/adminPage';
import ClassInfo from './components/ClassInfo.js';
import ChangeRemoveClass from './components/changeName_removeClass.js';
import {RemoveClass} from './components/changeName_removeClass.js';
import ChangeTeacher from './components/changeTeacher.js';
import  AddStudent from './components/add_reomve_students.js';

class App extends Component {
render() {


  return (
      <>
      <Navbar/>
      <ClassInfo/>



      <BrowserRouter>

      <SlideImages />







       </BrowserRouter>
     </>
  );
}
  }

export default App;
