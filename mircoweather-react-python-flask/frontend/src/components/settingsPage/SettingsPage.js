import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changeLoggedUser } from "../../redux/actions/logedUserActions";
import AlertBox from "../toollbox/AlertBox";
import * as magicStrings from "../../magicString";
import { changeWeatherPageBackground} from "../../redux/actions/weatherPageBackgroundAction"

function SettingsPage({ loggedUser,changeWeatherPageBackground }) {
  const [notificationMail, setNotifcationMail] = useState("");
  const [notificationPhoneNumber, setNotifcationPhoneNumber] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [locationState, setLocationState] = useState(location.state);
  useEffect(() => {
    setTimeout(() => {
      setLocationState(null);
    }, 10000);
  }, [locationState]);

  useEffect(()=>{
    changeWeatherPageBackground(null)
  })
  
  const passwordMatchingControl = () => {
    if (
      newPassword === newPasswordAgain &&
      newPassword !== "" &&
      newPasswordAgain !== ""
    ) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  };

  useEffect(() => {
    passwordMatchingControl();
  });
  const handleChangeInformation = async (e) => {
    e.preventDefault();
    const postResponse = await fetch("/changeInformation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationail: notificationMail,
        notificationPhoneNumber: notificationPhoneNumber,
        notificationType: notificationType,
        uid: loggedUser["uid"],
      }),
    });

    const response = await postResponse.json();
    if (response.code === 200) {
      setLocationState({
        class: "alertBoxSuccess",
        message:
          "The change information operation has been successfully completed.",
        type: "informationMessage",
      });
      navigate("/settings");
    } else if (response.code === 400) {
      let showMessage = "Something is wrong. Please, try again.";
      if (response.message === magicStrings.inputDataIsWrong) {
        showMessage = "Your entered data is wrong. Please, try again.";
      }
      setLocationState({
        class: "alertBoxFailed",
        message: showMessage,
        type: "informationMessage",
      });
      navigate("/settings");
    }
  };
  const handleChangeLocation = async (e) => {
    e.preventDefault();
    const postResponse = await fetch("/changeLocation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: currentLocation.split(",")[0],
        uid: loggedUser["uid"],
      }),
    });

    const response = await postResponse.json();
    if (response.code === 200) {
      setLocationState({
        class: "alertBoxSuccess",
        message:
          "The change location operation has been successfully completed.",
        type: "locationMessage",
      });
      window.localStorage.setItem("currentLocation",currentLocation.split(",")[0])
      navigate("/settings");
    } else if (response.code === 400) {
      let showMessage = "Something is wrong. Please, try again.";
      if (response.message === magicStrings.locationNotFound) {
        showMessage = "Your location data is wrong. Please, try again.";
      }
      setLocationState({
        class: "alertBoxFailed",
        message: showMessage,
        type: "locationMessage",
      });
      navigate("/settings");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const postResponse = await fetch("/changePassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword:newPassword,
        newPasswordAgain:newPasswordAgain,
        uid: loggedUser["uid"],
      }),
    });

    const response = await postResponse.json();
    if (response.code === 200) {
      setLocationState({
        class: "alertBoxSuccess",
        message:
          "The change password operation has been successfully completed.",
        type: "passwordMessage",
      });
      navigate("/settings");
    } else if (response.code === 400) {
      let showMessage = "Something is wrong. Please, try again.";
      if (response.message === magicStrings.passwordIsWrong) {
        showMessage = "Your password data is wrong. Please, try again.";
      }
      setLocationState({
        class: "alertBoxFailed",
        message: showMessage,
        type: "passwordMessage",
      });
      navigate("/settings");
    }
  };

  const getCurrentLocation = () => {
    const showPosition = async (position)=> {
      const langlong =
        position.coords.latitude + "," + position.coords.longitude;
      const response = await fetch(
        "http://api.positionstack.com/v1/reverse?access_key=ef78cc2b92eccff8c19061e7118fcb30&query=" +
          langlong
      );
      const data = await response.json();
      console.log(data);
      var i = 0;
      while (i < data["data"].length) {
        var city =
          data["data"][i]["region"] + ", " + data["data"][i]["country"];
        if (city === null) {
          i++;
        } else {
          break;
        }
      }
      setCurrentLocation(city);
    }

    const errorLocation = (error)=>{
      setLocationState({
        class: "alertBoxFailed",
        message: "Your location data is not available.",
        type: "locationMessage",
      });
      navigate("/settings");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,errorLocation)
    }
  };
  return (
    <div className="mainArea">
      <form className="inputForm settings" onSubmit={handleChangeInformation}>
        {locationState === null ? (
          <div></div>
        ) : locationState["type"] === "informationMessage" ? (
          <AlertBox data={locationState}></AlertBox>
        ) : null}
        <h1>CHANGE INFORMATION</h1>
        <div className="inputArea">
          <label htmlFor="notification-mail">
            The e-mail address where you want to receive notifications.
          </label>
          <input
            name="notification-mail"
            id="notification-mail"
            type="email"
            placeholder="Notification Mail"
            onChange={(e) => setNotifcationMail(e.target.value)}
          ></input>
        </div>
        <div className="inputArea">
          <label htmlFor="notification-phone-number">
            The phone number where you want to receive notifications.
          </label>
          <input
            name="notification-phone-number"
            id="notification-phone-number"
            type="text"
            placeholder="Notification Phone Number"
            onChange={(e) => setNotifcationPhoneNumber(e.target.value)}
          ></input>
        </div>
        <div className="inputArea">
          <label htmlFor="notification-phone-number">
            Select the types for which you want to receive notifications.{" "}
          </label>
          <select
            id="notificationType"
            name="notificationType"
            onChange={(e) => setNotificationType(e.target.value)}
          >
            <option value="">None</option>
            <option value="Mail">Mail</option>
            <option value="Sms">Sms</option>
            <option value="Mail&Sms">Mail&Sms</option>
          </select>
        </div>
        <button type="submit">CHANGE</button>
      </form>

      <form className="inputForm settings" onSubmit={handleChangeLocation}>
        {locationState === null ? (
          <div></div>
        ) : locationState["type"] === "locationMessage" ? (
          <AlertBox data={locationState}></AlertBox>
        ) : null}
        <h1>CHANGE LOCATION</h1>
        <div className="inputArea">
          <button type="button" onClick={() => getCurrentLocation()}>
            Get Location
          </button>
          <input
            name="notification-mail"
            id="location"
            type="text"
            placeholder="Your Location"
            readOnly
            value={currentLocation}
            onChange={(e) => setNotifcationMail(e.target.value)}
          ></input>
        </div>
        <button type="submit">CHANGE</button>
      </form>

      <form onSubmit={handleChangePassword} className="inputForm">
      {locationState === null ? (
          <div></div>
        ) : locationState["type"] === "passwordMessage" ? (
          <AlertBox data={locationState}></AlertBox>
        ) : null}
        <h1>CHANGE PASSWORD</h1>
        <div className="inputArea">
          <label htmlFor="new-password">New Password</label>
          <input
            name="new-password"
            id="new-password"
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
        </div>
        <div className="inputArea">
          <label htmlFor="new-password-again">New Password Again</label>
          <input
            name="new-password-again"
            id="new-password-again"
            type="password"
            placeholder="New Password Again"
            onChange={(e) => setNewPasswordAgain(e.target.value)}
          ></input>
        </div>
        <p>Password must be minimum eight characters.</p>
        {passwordMatched ? (
          <div></div>
        ) : (
          <p className="danger">Passwords are not matching.</p>
        )}
        <button type="submit">CHANGE</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUserReducer,
  };
}

const mapDispatchToProps = {
  changeLoggedUser,
  changeWeatherPageBackground
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
