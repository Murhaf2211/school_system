import React,{Component} from 'react';
import './css/form.css';
import {connect} from 'react-redux';
import {changeAction,loginFetch} from '../redux/redux.js'

 class Form extends Component{

  handleSubmit = (ev) =>{
    ev.preventDefault();
    this.props.makeRequest({userName:this.props.userNameValue,
                            password:this.props.passwordValue,
                            selectedOption:this.props.selectedOptionValue }
                              );
  }
  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}  className="login-wrap">
          <div className="login-html">
        		<input
            id="tab-1" type="radio" name="tab" className="sign-in"/><label htmlFor="tab-1" className="tab">Sign In</label>
        		<input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
        		<div className="login-form">

        			<div className="sign-in-htm">
        				<div className="group">
        					<label htmlFor="user" className="label">UserName</label>
        					<input  onChange ={this.props.handleChange} value={this.props.userNameValue} id="user" type="text" className="input"/>
        				</div>
        				<div className="group">
        					<label htmlFor="pass" className="label">Password</label>
        					<input  onChange ={this.props.handleChange} value={this.props.passwordValue} id="pass" type="password" className="input" data-type="password"/>
        				</div>

                <select   onChange={this.props.handleChange}  value={this.props.selectedOptionValue} > className="group">
                  <option value="School">School</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Student">Student</option>

                </select>

        				<div className="group">
        					<input id="check" type="checkbox" className="check" />
        				</div>
        				<div className="group">
        					<input type="submit" className="button" value="Sign In"/>
        				</div>
        				<div className="hr"></div>
        				<div className="foot-lnk">
        					<a href="#forgot">Forgot Password?</a>
        				</div>
        			</div>

			         <div className="sign-up-htm">
                <div className="group">
        					<label htmlFor="user" className="label">userName</label>
        					<input id="user" type="text" className="input"/>
        				</div>
        				<div className="group">
        					<label htmlFor="pass" className="label">Password</label>
        					<input id="pass" type="password" className="input" data-type="password"/>
        				</div>
                <div className="group">
        					<label htmlFor="pass" className="label">Email Address</label>
        					<input id="pass" type="text" className="input"/>
        				</div>


                <select  className="group">
                  <option value="School">School</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Student">Student</option>

                </select>





        				<div className="group">
        					<input type="submit" className="button" value="Sign Up"/>
        				</div>
        				<div className="hr"></div>
        				<div className="foot-lnk">
        					<label htmlFor="tab-1">Already Member?</label>
        				</div>
        			</div>
        		</div>
        	</div>
        </form>
        </>
    )
  }
}

const mapStateToprops =state =>{
  return{
    userNameValue:state.userNameValue,
    passwordValue:state.passwordValue,
    selectedOptionValue:state.selectedOptionValue
  }
}

const mapDispatchToprops = dispatch =>{
   return {
  handleChange:ev => dispatch(changeAction(ev)),
  makeRequest:credentials => dispatch(loginFetch(credentials))
   }
}

export const  LoginFormContainer = connect(mapStateToprops,mapDispatchToprops)(Form);
