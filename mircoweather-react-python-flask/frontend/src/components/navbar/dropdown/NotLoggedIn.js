import React from 'react'
import {Link} from 'react-router-dom'

function NotLoggedIn() {
  return (
    <ul>
    <li><Link to="/signin">
    <img className="dropdown-content-icon" src="./icon/register.png" alt="deneme"></img>
    <p>SIGN IN</p></Link></li>
    <li className="div-height"><div></div></li>               
    <li><Link to="/login">
    <img className="dropdown-content-icon" src="./icon/login.png" alt="deneme"></img>
    <p>LOG IN</p></Link></li>
  </ul>
  )
}

export default NotLoggedIn
