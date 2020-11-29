import React from 'react';
import './MainPage.css'
import {NavLink} from 'react-router-dom'

const mainPage = (props) =>{
  const roleBasedLink = {
    ADMIN: ["Manage User Account", "Assign Role", "Help Desk"],
    FINANCIAL: ["Finance Report", "Accounts Payable", "Accounts Receivable", "Tax"],
    SALES: ["Sales Reports", "Sales Leads", "Sales Demo"],
    HR: ["New Hire On-boarding", "Benefits", "Payroll", "Off-boarding", "HR Reports"],
    TECH: ["Application Monitoring", "Tech Support", "App Development", "App Admin", "Release Management"],
  }
  return(
    <div>
      <p>You are logged in as {props.roles.length > 1 ? props.roles.map(role=> role + ", ") : props.roles[0]}</p>
      {props.roles.map(role => {
        return (
          
          roleBasedLink[role].map(linkName => {
          return (<NavLink className="link" style={{display: "block"}} key={linkName} to={`/${linkName}`}>{linkName}</NavLink>)
          })
        )
      })}
    </div>

  )
}

export default mainPage;