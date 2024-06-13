import React, { useEffect }from 'react'
import { changeWeatherPageBackground} from "../../redux/actions/weatherPageBackgroundAction"
import { connect } from "react-redux";

function MainPage({changeWeatherPageBackground}) {

  useEffect(()=>{
    changeWeatherPageBackground(null)
  })
  return (
    <div className="mainArea">
    <div className="mainPage">
      <div className="mainPage-logo">
        <img src="./icon/logo.png" alt="mircoWeather"></img>
        <p>mircoWeather</p>
      </div>
      <p>
        Anyone can use the website to find out the instant weather forecast
        of the city you want, hourly weather forecast, daily weather
        forecast and whether there are extreme situations. Go to the weather
        page and find out the weather in your location right now.
      </p>
      <p>
        Anyone can get weather information by sms or e-mail if they want. Go
        to the User page and use it immediately.
      </p>
    </div>
  </div>
  )
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
  changeWeatherPageBackground
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);