import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import MainPage from "../mainPage/MainPage";
import Footer from "../footer/Footer";
import "../../scss/style.scss";
import NotFoundPage from "../common/NotFoundPage";
import WeatherPage from "../weatherPage/WeatherPage";
import SignInPage from "../signInPage/SignInPage";
import { Routes, Route } from "react-router-dom";
import LogInPage from "../logInPage/LogInPage";
import SettingsPage from "../settingsPage/SettingsPage";
import { changeLoggedUser } from "../../redux/actions/logedUserActions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { changeWeatherPageBackground} from "../../redux/actions/weatherPageBackgroundAction"

function App({ loggedUser, changeLoggedUser, lastWeather, weatherPageBackground,changeWeatherPageBackground }) {
  const [backgroundImage, setBackgroundImage] = useState(
    " background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.75)),url(../../public/background-photos/main.jpg)"
  );
  const [backgroundImageMain, setBackgroundImageMain] = useState(
    { backgroundImage: `url(${"./background-photos/main.jpg"})`}
  );
  useEffect(() => {
    const authControl = async (token) => {
      const postResponse = await fetch("/userAuthorizationControl", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const response = await postResponse.json();
      return response["value"];
    };

    const user = window.localStorage.getItem("loggedUser");
    if (user !== null) {
      authControl(JSON.parse(user)["token"]).then((response) => {
        if (response) {
          changeLoggedUser(JSON.parse(user));
        } else {
          changeLoggedUser(null);
          window.localStorage.removeItem("loggedUser");
        }
      });
    }
  }, []);



  return (
    //weather sayfasında dinamik backgroun değişmesi
    // <div className='container' style={{backgroundImage:`url(${backgroundImage})`}}>
    // alert(window.location.href.includes("weather"))

    <div
      className="container"
      style={weatherPageBackground?weatherPageBackground:null}
    >
      <Navbar></Navbar>
      <Routes>
        <Route index path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/weather" element={<WeatherPage></WeatherPage>}></Route>
        <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
        <Route path="/login" element={<LogInPage></LogInPage>}></Route>
        <Route
          path="/settings"
          element={
            loggedUser ? (
              <SettingsPage></SettingsPage>
            ) : (
              <Navigate
                state={{
                  class: "alertBoxFailed",
                  message: "You should be log in.",
                }}
                to="/login"
              ></Navigate>
            )
          }
        ></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUserReducer,
    lastWeather: state.lastWeather,
    weatherPageBackground:state.weatherPageBackgroundReducer
  };
}

const mapDispatchToProps = {
  changeLoggedUser,
  changeWeatherPageBackground
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
