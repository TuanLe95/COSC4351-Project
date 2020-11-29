import React from 'react';
import "./Login.css"
import Input from '../../../Components/Input/Input'
import {Link} from "react-router-dom"
import {required, length} from '../../../Utils/validators'
class Login extends React.Component{
  state = {
    loginForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required]
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [length({min: 5})]
      },
      isFormValid: false,
    },
  }

  inputOnChangeHandler = (input, e) => {
    this.setState((prevState)=>{
      let isValid = true;
      for (const validator of prevState.loginForm[input].validators){
        isValid = isValid && validator(e.target.value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          value: e.target.value,
          valid: isValid,
        }
      }
      console.log(input, updatedForm[input].valid);
      let isValidForm = true;
      for (const inputName in updatedForm){
        isValidForm = isValidForm && inputName.valid;
      }
      return {
        loginForm: updatedForm,
        isFormValid: isValidForm
      }
    })
  }
  inputOnBlurHandler = (input) => {
    this.setState((prevState)=>{
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          touched: true
        }
      }
      return {loginForm: updatedForm}
    })
  }
  render(){
    return(
      <div className="login__container">
        <form className="form" onSubmit={e => this.props.loginHandler(e, {
          email: this.state.loginForm.email.value,
          password: this.state.loginForm.password.value,
        })}>
          <h1 className="form__title">Login</h1>
          {this.props.error &&  <p className="error__text">{this.props.error.message}</p>}
          <Input 
            id="email"
            type="text"
            control="input"
            placeholder="Email"
            value={this.state.loginForm.email.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
            valid={this.state.loginForm.email.valid}
            touched={this.state.loginForm.email.touched}
          />
          <Input
            id="password"
            type="password"
            control="input"
            placeholder="Password"
            value={this.state.loginForm.password.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
            valid={this.state.loginForm.password.valid}
            touched={this.state.loginForm.password.touched}
          />
          <button className="form__button" type="submit">Login</button>
          <Link className="form__text" to="/signup">New user? Create account here</Link>
        </form>
      </div>
    )
  }
}

export default Login;