import React from 'react'
import './App.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Signup from './Pages/Auth/Signup/Signup';
import Login from "./Pages/Auth/Login/Login"
import MainPage from './Pages/MainPage/MainPage';
class App extends React.Component {
  state = {
    token: null,
    isAuth: false,
    userId: null,
    error: null,
    role:null,
  }
  loginHandler = (e, authData) => {
    // fetch data
    e.preventDefault();
    console.log(authData);
    const graphQL_loginMutation = {
      query: `
        mutation {
          logIn(userLoginInput: {
            email: "${authData.email}"
            password: "${authData.password}"
          }){
            token
            user{
              _id
              U_role
            }
          }
        }
      `
    }
    fetch("http://localhost:8080/graphql",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphQL_loginMutation)
    })
    .then(res => res.json())
    .then(resData => {
      console.log("resData: ", resData);
      if(resData.errors){
        throw new Error(resData.errors[0].message);
      }

      this.setState({
        isAuth: true,
        token: resData.data.logIn.token,
        userId: resData.data.logIn.user._id,
        role: resData.data.logIn.user.U_role,
        error: null,
      })
    })
    .catch(err=>{
      console.log(err);
      this.setState({
        isAuth:false,
        error: err,
      })
    })
  }

  signupHandler = (e, authData) => {
    //fetch data
    e.preventDefault();
    console.log(authData);
    let userRole = [];
    authData.roles.forEach(role => {
    if(role.isChecked === true){
        userRole.push(role.value);
      }
    })
    const graphQL_signupMutation1 = {
      query: `
      mutation createUser($inputName: String!, $inputEmail: String!, $inputPassword: String!, $inputRoles: [String] ){
        signUp(userSignupInput: {name: $inputName, email: $inputEmail, password: $inputPassword, role: $inputRoles}){
          token
          user{
            _id
            U_name
            U_email
          }
        }
      }
      ` ,
      variables: {
        inputName: authData.name,
        inputEmail: authData.email,
        inputPassword: authData.password,
        inputRoles: userRole
      }
    }
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(graphQL_signupMutation1)
    })
    .then(res => res.json())
    .then(resData => {
      if(resData.errors){
        throw new Error(resData.errors[0].message);
      }
      this.setState({
        token: resData.data.signUp.token,
        userId: resData.data.signUp.user._id,
        role: resData.data.signUp.user.U_role,
        error: null
      });
      this.props.history.replace("/");
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isAuth: false,
        error: err,
      })
    })
  }
  
  render(){
    let routes = (
      <Switch>
        <Route exact path="/" render={()=><Login error={this.state.error} loginHandler={this.loginHandler}/>}/>
        <Route exact path="/signup" render={()=> <Signup error={this.state.error} signupHandler={this.signupHandler}/>}/>
        <Redirect to ="/"/>
      </Switch>
    )
    if(this.state.isAuth){
      routes = (
        <Switch>
          <Route exact path="/" render={()=><MainPage roles={this.state.role}/>}/>
        </Switch>
      )
    }
    return (
      <div className="body">
        {routes}
      </div>
    );
  }
  
}

export default withRouter(App);
