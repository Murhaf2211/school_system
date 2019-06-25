import React,{Component} from 'react';
import './css/form.css';
import {connect} from 'react-redux';
import {loginFunction, signUpfunction,loginFetch,signUpFetch} from '../redux/redux.js'

 class Form extends Component{

  handleSubmit = (ev) =>{
    ev.preventDefault();
                            this.props.makeRequest({userName:this.props.userNameValue,
                                                    password:this.props.passwordValue,
                                                    selectOptionSignIn:this.props.selectOptionSignIn});

                            this.props.makeRequest1({
                                                      userName_sign_up:this.props.userName_sign_up,
                                                      password_sign_up:this.props.password_sign_up,
                                                      selectOption_sign_up:this.props.selectOption_sign_up
                                                        })




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

                <input  onChange ={this.props.handleChange} value={this.props.userNameValue} id="user" type="text" className="input" placeHolder="UserName"/>
        				</div>
        				<div className="group">

        					<input  onChange ={this.props.handleChange} value={this.props.passwordValue} id="pass" type="password" className="input" data-type="password" placeHolder="password"/>
        				</div>

                <select className="select "  onChange={this.props.handleChange}  value={this.props.selectOptionSignIn}>
                   <option >choose your role</option>
                   <option   value="School">School</option>

                  <option  value="Trainer">Trainer</option>
                  <option     value="Student">Student</option>

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
        					<input    onChange ={this.props.handleChange_sign_up} value={this.props.userName_sign_up} id="user" type="text" className="input"/>
        				</div>
        				<div className="group">
        					<label htmlFor="pass" className="label">Password</label>
        					<input   onChange ={this.props.handleChange_sign_up} value={this.props.password_sign_up}  id="pass" type="password" className="input" data-type="password"/>
        				</div>
            <select  onChange={this.props.handleChange_sign_up} value={this.props.selectOption_sign_up} className="group">
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
    selectOptionSignIn:state.selectOptionSignIn,
    userName_sign_up:state.userName_sign_up,
    password_sign_up:state.password_sign_up,
    selectOption_sign_up:state.selectOption_sign_up
  }
}

const mapDispatchToprops = dispatch =>{
   return {
  handleChange:ev => dispatch(loginFunction(ev)),
  handleChange_sign_up:ev => dispatch(signUpfunction(ev)),
  makeRequest:credentials => dispatch(loginFetch(credentials)),
  makeRequest1:credentials2 => dispatch(signUpFetch(credentials2))
   }
}

export  const  LoginFormContainer = connect(mapStateToprops,mapDispatchToprops)(Form);
