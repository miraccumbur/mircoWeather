import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as magicStrings from "../../magicString";
import AlertBox from "../toollbox/AlertBox";
import { changeWeatherPageBackground} from "../../redux/actions/weatherPageBackgroundAction"
import { connect } from "react-redux";

function SignInPage({changeWeatherPageBackground}) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state)
  const [locationState, setLocationState] = useState(location.state);

  const passwordMatchingControl = () => {
    if (password === passwordAgain && password !== "" && passwordAgain !== "") {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLocationState(null);
    }, 10000);
  }, [locationState]);

  useEffect(()=>{
    changeWeatherPageBackground(null)
  })
  
  useEffect(() => {
    passwordMatchingControl();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postResponse = await fetch("/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        mail: mail,
        password: password,
        passwordAgain: passwordAgain,
      }),
    });

    const response = await postResponse.json();
    if (response.code === 200) {
      navigate("/login", {
        state: {
          class: "alertBoxSuccess",
          message:
            "The sign in operation has been successfully completed. Now you can login.",
        },
      });
    } else if (response.code === 400) {
      let showMessage = "Something is wrong. Please, try again.";
      if (response.message === magicStrings.inputDataIsWrong) {
        showMessage = "Your entered data is wrong. Please, try again.";
      } else if (response.message === magicStrings.mailAlreadyExist) {
        showMessage =
          "Your entered mail is already used. Please, try again with different mail.";
      }
      setLocationState({ class: "alertBoxFailed", message: showMessage });
      navigate("/signin");
    }
  };

  return (
    <div className="mainArea">
      <form onSubmit={handleSubmit} className="inputForm">
        {locationState === null ? (
          <div></div>
        ) : (
          <AlertBox data={locationState}></AlertBox>
        )}
        <div className="inputArea">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="inputArea">
          <label htmlFor="surname">Surname</label>
          <input
            name="surname"
            id="surname"
            type="text"
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
          ></input>
        </div>
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
        <div className="inputArea">
          <label htmlFor="password-again">Password Again</label>
          <input
            name="passwordAgain"
            id="passwordAgain"
            type="password"
            placeholder="Password Again"
            onChange={(e) => setPasswordAgain(e.target.value)}
          ></input>
        </div>
        <p>Password must be minimum eight characters.</p>
        {passwordMatched ? (
          <div></div>
        ) : (
          <p className="danger">Passwords are not matching.</p>
        )}
        <button type="submit">SIGN IN</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
  changeWeatherPageBackground
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
