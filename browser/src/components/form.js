import React,{Component} from 'react';
import './form.css';
import {connect} from 'react-redux';
import {changeAction,loginFetch} from '../redux/redux.js'






 class Form extends Component{

  handleSubmit = (ev) =>{
    ev.preventDefault();
    this.props.makeRequest({Username:this.props.userNameValue,
                            password:this.props.passwordValue});
  }


  render() {

    return(
          <>
      <form onSubmit={this.handleSubmit} className="login-wrap">

	<div className="login-html">

		<input type='text'   id="tab-1" type="radio" name="tab" className="sign-in" checked/>
    <label for="tab-1" className="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab">Sign Up</label>
		<div className="login-form">
			<div className="sign-in-htm">
				<div className="group">
					<label for="user" className="label">Username</label>
					<input    onChange={this.props.handleChange}  value={this.props.userNameValue} id="user" type="text" className="input"/>
				</div>
				<div className="group">
					<label for="pass" className="label">Password</label>
					<input id="pass" onChange={this.props.handleChange}  value={this.props.passwordValue} type="password" className="input" data-type="password"/>
				</div>


				<div className="group">
					<input id="check" type="checkbox" className="check" checked/>

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
					<label for="user" className="label">Username</label>
					<input id="user" type="text" className="input"/>
				</div>
				<div className="group">
					<label for="pass" className="label">Password</label>
					<input id="pass" type="password" className="input" data-type="password"/>
				</div>

				<div className="group">
					<label for="pass" className="label">Email Address</label>
					<input id="pass" type="text" className="input"/>
				</div>
        <div className="group">
        <div className="group">
        	<label className="label">are you Student,teacher or admin?</label>

          <select    className="selectField">

            <option value="student">student</option>
            <option value="admin">admin</option>
            <option value="teacher">teacher</option>

          </select>
				</div>
        </div>
				<div className="group">
					<input type="submit" className="button" value="Sign Up"/>
				</div>
				<div className="hr"></div>

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
    passwordValue:state.passwordValue
  }
}



const mapDispatchToprops = dispatch =>{


   return {
  handleChange:ev => dispatch(changeAction(ev)),
  makeRequest:credentials => dispatch(loginFetch(credentials))

   }
}

export const  LoginFormContainer = connect(mapStateToprops,mapDispatchToprops)(Form);
