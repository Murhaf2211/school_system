import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {dataFromServer:[],
                      TeacherEvaluation:0,
                      courseEvaluation:0,
                      studentComent:'',
                      courseEVarray:[],
                      teacherEVarray:[],
                      studentComArray:[],
                      averageCourseEV:80,
                      averageTeacherEV:50
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
