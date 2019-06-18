

mport {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {dataFromServer:[], TeacherEvaluation:[],courseEvaluation:[],studentComent:[]};

const reducer = (state = initialState, action) => {
 const copyOfState = {...state};

 switch (action.type) {
   case 'updateCOURS':
     const changeCourseEv = action.event.target;
     updateCourseEV.courseEvaluation[changeCourseEv]= action.event.target.value;
     return copyOfState;
   case 'updateTCHER':
     const changeTeacherEV = action.event.target;
     updateTeacherEV.TeacherEvaluation[changeTeacherEV]= action.event.target.value;
     return copyOfState;
   case 'updateSTcoment':
     const changeStudentCom = action.event.target;
     updateStudentComnt.studentComent[changeStudentCom]= action.event.target.value;
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
