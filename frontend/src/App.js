import React from 'react'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import Signup from './Pages/Auth/Signup/Signup';
import Login from "./Pages/Auth/Login/Login"
import MainPage from './Pages/MainPage/MainPage';
class App extends React.Component {
  state = {
    token: null,
    isAuth: false,
    userId: null,
    error: null,
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
        throw new Error("Login failed!");
      }

      this.setState({
        isAuth: true,
        token: resData.data.logIn.token,
        userId: resData.data.logIn.user._id,
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
    const graphQL_signupMutation = {
      query: `
        mutation {
          signUp(userSignupInput: 
            { name: "${authData.name}", 
              email: "${authData.email}", 
              password: "${authData.password}"
            })
          {
            token
            user{
              _id
              U_name
              U_email
            }
          }
        }
      `
    }
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(graphQL_signupMutation)
    })
    .then(res => res.json())
    .then(resData => {
      if(resData.errors && resData.errors[0].status === 422){
        throw new Error("Signup failed");
      }
      if(resData.errors){
        throw new Error("Signup failed!");
      }
      this.setState({
        isAuth: true,
        token: resData.data.signUp.token,
        userId: resData.data.signUp.user._id,
      })
    })
    .catch(err => {
      console.log(e); 
      this.setState({
        isAuth: false,
        error: err,
      })
    })
  }
  
  render(){
    let routes = (
      <Switch>
        <Route exact path="/" render={()=><Login loginHandler={this.loginHandler}/>}/>
        <Route exact path="/signup" render={()=> <Signup signupHandler={this.signupHandler}/>}/>
        <Redirect to ="/"/>
      </Switch>
    )
    if(this.state.isAuth){
      routes = (
        <Switch>
          <Route exact path="/" render={()=><MainPage/>}/>
        </Switch>
      )
    }
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
  
}

export default App;
