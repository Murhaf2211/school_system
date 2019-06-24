import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {dataFromServer:[],
                      TeacherEvaluation:0,
                      userNameValue:'',
                      passwordValue:'',
                      selectOptionSignIn:'',
                      userName_sign_up:'',
                      NameOfNewClassValue:'',
                      NameOfNewTeacherValue:'',
                      changeTeacherVaule:'',
                      password_sign_up:'',
                      selectOption_sign_up:'',
                      addstudentValue:'',
                      classBelongStudentAdd:'',
                      removestudentValue:'',
                      classBelongStudentremove:'',
                      deleteClassValue:'',
                      courseEvaluation:0,
                      studentComent:'',
                      averageCourseEV:80,
                      averageTeacherEV:50,
                     };

const reducer = (state = initialState, action) => {
  const copyOfState = {...state};

  switch (action.type) {
    case 'updateCOURS':
      const changeCourseEv = action.event.target;
      copyOfState.courseEvaluation = changeCourseEv.value;
      return copyOfState;
    case 'updateTCHER':
      const changeTeacherEV = action.event.target;
      copyOfState.TeacherEvaluation = changeTeacherEV.value;
      return copyOfState;
    case 'updateSTcoment':
      const changeStudentCom = action.event.target;
      copyOfState.studentComent = changeStudentCom.value;
      return copyOfState;
    case 'SUBMIT':
      copyOfState.courseEVarray.puch(copyOfState.courseEvaluation);
      copyOfState.teacherEVarray.puch(copyOfState.TeacherEvaluation);
      copyOfState.studentComArray.puch(copyOfState.studentComent);
      copyOfState.courseEvaluation = 0;
      copyOfState.TeacherEvaluation= 0;
      copyOfState.studentComent= '';
      return copyOfState;
    case 'AVCOURS':
      copyOfState.averageCourseEV = action.event.target;
      return copyOfState;
    case 'AVTCHER':
      copyOfState.averageTeacherEV = action.event.target;
      return copyOfState;
    case 'FETCHDATA':
      copyOfState.dataFromServer = '';
      return copyOfState;
    case 'ERROR' :
      copyOfState.dataFromServer = action.payload.message;
      return copyOfState;


    case 'login':
     if (action.payload.target.getAttribute('type') === 'text') {
       copyOfState.userNameValue = action.payload.target.value;
     } else if (action.payload.target.getAttribute('type') === 'password') {
       copyOfState.passwordValue = action.payload.target.value;
     } else  {
       copyOfState.selectOptionSignIn = action.payload.target.value
     }

    return copyOfState;

      case 'signUp':
       if(action.payload.target.getAttribute('type')==='text') {
         copyOfState.userName_sign_up=action.payload.target.value;
       }  else if (action.payload.target.getAttribute('type')==='password') {
         copyOfState.password_sign_up=action.payload.target.value;
       }   else {
         copyOfState.selectOption_sign_up=action.payload.target.value
       }

       return copyOfState;

       case 'addClass' :
       if (action.payload.target.getAttribute('identifier')==="first") {
             copyOfState.NameOfNewClassValue=action.payload.target.value;

       } else {
               copyOfState.NameOfNewTeacherValue=action.payload.target.value;
       }

         return copyOfState;


         case 'UpdateTeacher' :
         copyOfState.changeTeacherVaule= action.payload.target.value;

         return copyOfState;

         case 'addStudent' :
         if(action.payload.target.getAttribute('identifier')==='student'){

           copyOfState.addstudentValue=action.payload.target.value;
         }  else {
            copyOfState.classBelongStudentAdd=action.payload.target.value
         }
         return copyOfState;


         case 'removestudent' :
         if(action.payload.target.getAttribute('identifier')==='student2'){

           copyOfState.removestudentValue=action.payload.target.value;
         }  else {
            copyOfState.classBelongStudentremove=action.payload.target.value
         }
         return copyOfState;

         case 'deleteclass' :
         copyOfState.deleteClassValue= action.payload.target.value;

         return copyOfState;

      default:
      return copyOfState;
  }
}



export const updateCourseEV = ev => {
  return{type:'updateCOURS', event: ev}
}
export const updateTeacherEV = ev => {
  return{type:'updateTCHER', event: ev}
}
export const updateStudentComnt = ev => {
  return{type:'updateSTcoment', event: ev}
}
export const submitValues = ev => {
  return{type:'SUBMIT' , event: ev}
}
export const updateAVcourseEV = ev => {
  return{type:'AVCOURS', event: ev}
}
export const updateAVteacherEV = ev => {
  return{type:'AVTCHER', event: ev}
}

export const loginFunction = payload => {
  return { type: 'login', payload:payload }
}

export const signUpfunction = payload => {

  return {type:'signUp',payload:payload}
}

export const addClassFunction =payload =>{

  return {type:'addClass',payload:payload}
}


export const changeTeacherFunction = payload =>{

  return {type:'UpdateTeacher',payload:payload}
}

export const addStudentFunction = payload =>{
  return {type:'addStudent',payload:payload}
}

export const removeStudentFunction = payload =>{
  return {type:'removestudent', payload:payload}
}
export const deleteClassFunction = payload =>{
  return {type:'deleteclass', payload:payload}
}




const allData = data => {
  return{
    type: 'FETCHDATA',
    payload :data
  }
}

const badRequest = error => {
 return {
   type: 'ERROR',
   payload :error
 }
}




export const loginFetch = credentials2 => {
  return function(dispatch) {
    console.log(credentials2);
    fetch('/users/login', {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(credentials2)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Authentication failed');
      }

      return res.json();
    })
    .then(userData => {
      console.log(userData);

    })
    .catch(err => {
      console.warn(err);

    })
  }
}


export const signUpFetch = credentials => {
  return function(dispatch) {
    console.log(credentials);
    fetch('/users/create', {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Error');
      }

      return res.json();
    })
    .then(userData => {
      console.log(userData);

    })
    .catch(err => {
      console.warn(err);

    })
  }
}



export const newClass = addClass => {
  return function(dispatch) {
    console.log(addClass);
    fetch('/class/createClass ', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(addClass)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Authentication failed');
      }
      return res.json();
    })
  }
}




export const updateTeacher = update => {
  return function(dispatch) {
    console.log(update);
    fetch('/trainer/updateTrainer  ', {
      method: 'put',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(update)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Authentication failed');
      }
      return res.json();
    })
  }
}

export const addStudentTo = addSt => {
  return function(dispatch) {
    console.log(addSt);
    fetch('/student/addStudent ', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(addSt)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Authentication failed');
      }
      return res.json();
    })
  }
}


export const delStudent = removeSt => {
  return function(dispatch) {
    console.log(removeSt);
    fetch('/student/deleteStudent ', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(removeSt)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Authentication failed');
      }
      return res.json();
    })
  }
}

export const delClass = removeClass => {
  return function(dispatch) {
    console.log(removeClass);
    fetch('/class/deleteClass  ', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(removeClass)
    })
    .then(res => {
      if (res.status === 400 || res.status === 404) {
        throw new Error('Authentication failed');
      }
      return res.json();
    })
  }
}





export const fetchFrom = () => {
  return function (dispatch){
    fetch('')
    .then(res => {
      if(res.status >= 400 && res.status <500){
        throw new Error('Error! check your functions');
      }else{
        return res.json();
      }
    })
    .then(dataObject => {
      dispatch(allData(dataObject));
    })
    .catch(err => {
      dispatch(badRequest(err))
    })
  }
}


export const store = createStore(reducer, applyMiddleware(thunk));
