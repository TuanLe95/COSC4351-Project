import React from 'react';
import "./Signup.css"
import Input from '../../../Components/Input/Input'
import {required, length } from '../../../Utils/validators'
class Signup extends React.Component{
  state = {
    signUpForm: {
      name:{
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
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
        validators: [required, length({min: 5})]
      },
      roles: [
        {id: 0, value: "ADMIN", isChecked: false},
        {id: 1, value: "FINANCIAL", isChecked: false}, 
        {id: 2, value: "SALES", isChecked: false},
        {id: 3, value: "HR", isChecked: false}, 
        {id: 4, value: "TECH", isChecked: false},
      ],
      isFormValid: false,
    },
  }
  checkboxOnChangeHandler = (input, e) => {
    this.setState(prevState => {
      const rolesArray = prevState.signUpForm.roles;
      rolesArray[input].isChecked = e.target.checked;
      const updatedForm = {
        ...prevState.signUpForm,
        roles: rolesArray,
      }
      return {signUpForm: updatedForm}
    })
  }
  inputOnChangeHandler = (input, e) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.signUpForm[input].validators){
        isValid = isValid && validator(e.target.value);
      }
      const updatedForm  = {
        ...prevState.signUpForm,
        [input]: {
          ...prevState.signUpForm[input],
          value: e.target.value,
          valid: isValid,
        }
      }
      let formIsValid = true;
      for (const inputName in updatedForm){
        formIsValid = formIsValid && updatedForm[inputName].valid
      }
      return {
        signUpForm: updatedForm,
        isFormValid: formIsValid
      }
    })
  }
  inputOnBlurHandler = (input) => {
    this.setState(prevState => {
      const updatedForm = {
        ...prevState.signUpForm,
        [input]: {
          ...prevState.signUpForm[input],
          touched: true,
        }
      }
      return {signUpForm: updatedForm}
    })
  }
  render(){
    return(
      <div className="signup__container">
        <form className="" onSubmit={e => this.props.signupHandler(e, {
          name: this.state.signUpForm.name.value,
          email: this.state.signUpForm.email.value,
          password: this.state.signUpForm.password.value,
          roles: this.state.signUpForm.roles
        })}>
          <h1 className="form__title">Admin Registration</h1>
          {this.props.error && <p className="error__text">{this.props.error.message}</p>}
          <Input 
            id="name"
            type="text"
            control="input"
            placeholder="Your name"
            value={this.state.signUpForm.name.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
            valid={this.state.signUpForm.name.valid}
            touched={this.state.signUpForm.name.touched}
          />
          <Input 
            id="email"
            type="text"
            control="input"
            placeholder="Email"
            value={this.state.signUpForm.email.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
            valid={this.state.signUpForm.email.valid}
            touched={this.state.signUpForm.email.touched}
          />
          <Input
            id="password"
            type="password"
            control="input"
            placeholder="Password"
            value={this.state.signUpForm.password.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
            valid={this.state.signUpForm.password.valid}
            touched={this.state.signUpForm.password.touched}
          />
          {this.state.signUpForm.roles.map(checkbox => 
          <Input 
            id={checkbox.id}
            key={checkbox.id}
            type="checkbox"
            control="input"
            label={checkbox.value}
            inputOnChangeHandler={this.checkboxOnChangeHandler}
            inputOnBlurHandler={()=>{}}
          />)}
          <button className="form__button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;