import React from 'react';
import "./Login.css"
import Input from '../../../Components/Input/Input'

class Login extends React.Component{
  state = {
    loginForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: []
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: []
      },
      isValidForm: false,
    },
  }

  inputOnChangeHandler = (input, e) => {
    this.setState((prevState)=>{
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          value: e.target.value,
        }
      }
      return {loginForm: updatedForm}
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
      <div className="">
        <form className="" onSubmit={e => this.props.loginHandler(e, {
          email: this.state.loginForm.email.value,
          password: this.state.loginForm.password.value,
        })}>
          <h1 className="form__title">Admin Login</h1>
          <Input 
            id="email"
            type="text"
            control="input"
            placeholder="Email"
            value={this.state.loginForm.email.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
          />
          <Input
            id="password"
            type="password"
            control="input"
            placeholder="Password"
            value={this.state.loginForm.password.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;