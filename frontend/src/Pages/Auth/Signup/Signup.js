import React from 'react';
import "./Signup.css"
import Input from '../../../Components/Input/Input'

class Signup extends React.Component{
  state = {
    signUpForm: {
      name:{
        value: "",
        valid: false,
        touched: false,
        validators: [],
      },
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
      roles: [
        {id: 0, value: "ADMIN", isChecked: false},
        {id: 1, value: "FINANCIAL", isChecked: false}, 
        {id: 2, value: "SALES", isChecked: false},
        {id: 3, value: "HR", isChecked: false}, 
        {id: 4, value: "TECH", isChecked: false},
      ],
      isValidForm: false,
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
      const updatedForm  = {
        ...prevState.signUpForm,
        [input]: {
          ...prevState.signUpForm[input],
          value: e.target.value,
        }
      }
      return {signUpForm: updatedForm}
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
      <div className="">
        <form className="" onSubmit={e => this.props.signupHandler(e, {
          name: this.state.signUpForm.name.value,
          email: this.state.signUpForm.email.value,
          password: this.state.signUpForm.password.value,
          roles: this.state.signUpForm.roles
        })}>
          <h1 className="form__title">Admin Registration</h1>
          <Input 
            id="name"
            type="text"
            control="input"
            label="Name:"
            placeholder="Your name"
            value={this.state.signUpForm.name.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
          />
          <Input 
            id="email"
            type="text"
            control="input"
            label="Email:"
            placeholder="Email"
            value={this.state.signUpForm.email.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
          />
          <Input
            id="password"
            type="password"
            control="input"
            label="Password:"
            placeholder="Password"
            value={this.state.signUpForm.password.value}
            inputOnChangeHandler={this.inputOnChangeHandler}
            inputOnBlurHandler={this.inputOnBlurHandler}
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
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;