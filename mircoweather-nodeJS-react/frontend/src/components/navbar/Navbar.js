import React, {} from "react";
import LoggedIn from "./dropdown/LoggedIn";
import NotLoggedIn from "./dropdown/NotLoggedIn";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeLoggedUser } from "../../redux/actions/logedUserActions";

function Navbar({ changeLoggedUser, loggedUser }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(
  //   (loggedUser) => {
  //     const authControl = async (token) => {
  //       const postResponse = await fetch("/userAuthorizationControl", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           token: token,
  //         }),
  //       });
  //       const response = await postResponse.json();
  //       return response["value"]
  //     };

  //     const user = window.localStorage.getItem("loggedUser");
  //     if (user !== null) {
  //       authControl(JSON.parse(user)["token"])
  //       .then((response)=>{
  //         if (response){
  //           changeLoggedUser(JSON.parse(user));
  //         }else{
  //           changeLoggedUser({})
  //           window.localStorage.removeItem("loggedUser")
  //         }
  //       })
  //     }
  //   },[]
  // );
  // useEffect(() => {
  //   if (loggedUser.hasOwnProperty("uid")) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [loggedUser]);

  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo-div">
          <img
            className="navbar-logo-icon"
            src="./icon/logo.png"
            alt="deneme"
          ></img>
          <p>mircoWeather</p>
        </div>
      </Link>

      <ul className="navbar-right">
        <li>
          <Link to="/weather">WEATHER</Link>
        </li>
        <li>
          <div>
            USER
            <img
              className="user-button-icon"
              src="./icon/navbar-user-down.png"
              alt=""
            ></img>
          </div>
          {loggedUser ? <LoggedIn></LoggedIn> : <NotLoggedIn></NotLoggedIn>}
        </li>
      </ul>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
