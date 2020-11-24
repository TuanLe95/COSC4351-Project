import React from 'react';
import './MainPage.css'
import {NavLink} from 'react-router-dom'

const mainPage = () =>{
  return(
    <div>
      <NavLink to="/1">1</NavLink>
      <NavLink to="/2">2</NavLink>
      <NavLink to="/3">3</NavLink>
      <NavLink to="/4">4</NavLink>
      <NavLink to="/5">5</NavLink>
    </div>

  )
}

export default mainPage;