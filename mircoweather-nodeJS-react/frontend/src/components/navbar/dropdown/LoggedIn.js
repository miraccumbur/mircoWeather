import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { connect } from "react-redux";
import {changeLoggedUser} from "../../../redux/actions/logedUserActions"

function LoggedIn({
  changeLoggedUser,
  loggedUser
}) {
  const navigate=useNavigate()
  const logout=()=>{
    changeLoggedUser(null)
    window.localStorage.removeItem("loggedUser")
    navigate("/")
    window.location.reload(false);
    
  }
  return (
    <ul>
    <li><div className='nameDiv'>
    <img className="dropdown-content-icon" src="./icon/hi.png" alt="deneme"></img>
    <p>{loggedUser["name"]}</p></div></li>
    <li className="div-height"><div></div></li>               
    <li><Link to="/settings">
    <img className="dropdown-content-icon" src="./icon/settings.png" alt="deneme"></img>
    <p>SETTINGS</p></Link></li>
    <li className="div-height"><div></div></li>  
    <li><button onClick={()=>logout()}>
    <img className="dropdown-content-icon" src="./icon/signout.png" alt="deneme"></img>
    <p>LOG OUT</p></button></li>
  </ul>
  )
}

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUserReducer,
  };
}

const mapDispatchToProps={
  changeLoggedUser

}

export default connect(mapStateToProps,mapDispatchToProps)(LoggedIn);