import React, {useState,useEffect} from 'react'
import AlertBox from "../toollbox/AlertBox";
import { useNavigate,useLocation } from "react-router-dom";
import * as magicStrings from "../../magicString";
import { connect } from "react-redux";
import {changeLoggedUser} from "../../redux/actions/logedUserActions"
import { changeWeatherPageBackground} from "../../redux/actions/weatherPageBackgroundAction"

function LogInPage({
  changeLoggedUser,
  loggedUser,
  changeWeatherPageBackground
}) {
    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();
    const location = useLocation();
    const [locationState,setLocationState]=useState(location.state)
    useEffect(()=>{
        setTimeout(()=>{
          setLocationState(null)
        },10000)
    },[locationState])

    useEffect(()=>{
      changeWeatherPageBackground(null)
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postResponse = await fetch("/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: mail,
            password: password
          }),
        });
    
        const response = await postResponse.json();
        if (response.code === 200) {
          window.localStorage.setItem('loggedUser', JSON.stringify(response.userInfo));
          changeLoggedUser(response.userInfo)
          navigate("/settings", { state: { class:"alertBoxSuccess", message: "The log in operation has been successfully completed." } });
        } else if (response.code === 400) {
          console.log(response)
          let showMessage = "Something is wrong. Please, try again.";
          if (response.message === magicStrings.emailIsWrong) {
            showMessage = "Your entered email is wrong. Please, try again.";
          } else if (response.message === magicStrings.passwordIsWrong) {
            showMessage =
              "Your entered password is wrong. Please, try again.";
          } else if (response.message === magicStrings.emailNotFound) {
            showMessage="Your entered mail is not exist. Please, try again with different mail."
          }
          setLocationState({ class:"alertBoxFailed", message: showMessage })
          navigate("/login");
        }
      };
    

  return (
    <div className='mainArea'>
    <form onSubmit={handleSubmit} className="inputForm">
      {locationState === null?<div></div>:<AlertBox data={locationState}></AlertBox>}
      <div className="inputArea">
        <label htmlFor="mail">Mail</label>
        <input
          name="mail"
          id="mail"
          type="email"
          placeholder="Mail"
          onChange={(e) => setMail(e.target.value)}
        ></input>
      </div>
      <div className="inputArea">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button type="submit">LOG IN</button>
    </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUserReducer,
  };
}

const mapDispatchToProps={
  changeLoggedUser,changeWeatherPageBackground

}

export default connect(mapStateToProps,mapDispatchToProps)(LogInPage);