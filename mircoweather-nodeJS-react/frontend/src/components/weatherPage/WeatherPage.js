import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { changeCurrentLocation } from "../../redux/actions/currentLocationActions";
import { changeWeatherPageBackground} from "../../redux/actions/weatherPageBackgroundAction"

function WeatherPage({
  currentLocation,
  changeCurrentLocation,
  cities,
  lastWeather,
  changeWeatherPageBackground
}) {
  const location = useLocation();
  const [searchCityName, setSearchCityName] = useState(currentLocation);
  const [recomendedAreaDisplay, setRecomendedAreaDisplay] = useState(false);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [weather, setWeather] = useState(lastWeather);
  const [dailyCount, setDailyCount] = useState(0);
  const [dailyCountForArea2, setDailyCountForArea2] = useState(1);
  const [hourlyCount, setHourlyCount] = useState(0);
  const [hourlyCountForArea2, setHourlyCountForArea2] = useState(1);

  useEffect(() => {
    let changedCityList = [];
    cities.map((city) => {
      if (city.toLowerCase().includes(searchCityName.toLowerCase())) {
        changedCityList.push(city);
      }
    });
    setFilteredCities(changedCityList);
  }, [searchCityName]);

  useEffect(() => {
    getWeather(searchCityName);
  }, []);

  const getWeather = async (city) => {
    await changeCurrentLocation(city);
    const postResponse = await fetch("/getWeather", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: city,
      }),
    });

    const response = await postResponse.json();
    if (response.code === 200) {
      // console.log(response);
      setWeather(response["weather"]);
      window.localStorage.setItem(
        "lastWeather",
        JSON.stringify(response.weather)
      );
      window.localStorage.setItem("currentLocation",city)
      if(response["weather"]["daily"][0]["sunrise"]<response["weather"]["current"]["dt"]&&response["weather"]["daily"][0]["sunset"]>response["weather"]["current"]["dt"]){
        changeWeatherPageBackground({ backgroundImage: `url(${"./background-photos/"+weather["current"]["weather"]["main"]+"-day.jpg"})`})
      }else{
        changeWeatherPageBackground({ backgroundImage: `url(${"./background-photos/"+weather["current"]["weather"]["main"]+"-night.jpg"})`})
      }
      
    } else if (response.code === 400) {
    }
  };

  useEffect(()=>{
    if(weather["daily"][0]["sunrise"]<weather["current"]["dt"]&&weather["daily"][0]["sunset"]>weather["current"]["dt"]){
      changeWeatherPageBackground({ backgroundImage: `url(${"./background-photos/"+weather["current"]["weather"]["main"]+"-day.jpg"})`})
    }else{
      changeWeatherPageBackground({ backgroundImage: `url(${"./background-photos/"+weather["current"]["weather"]["main"]+"-night.jpg"})`})
    }  },[weather])

  const handleSearchCity = async (city) => {
    await getWeather(city);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setRecomendedAreaDisplay(false)
    await getWeather(searchCityName);
  }

  const weatherIconChooserForCurrent = (
    sunrise,
    sunset,
    dt,
    main,
    description
  ) => {
    if (sunrise < dt && sunset > dt) {
      if (main === "Clouds") {
        return "./icon/" + description.replace(" ", "") + "-day.png";
      } else {
        return "./icon/" + main + "-day.png";
      }
    } else {
      if (main === "Clouds") {
        return "./icon/" + description.replace(" ", "") + "-night.png";
      } else {
        return "./icon/" + main + "-night.png";
      }
    }
  };

  const weatherIconChooser = (main, description) => {
    if (main === "Clouds") {
      return "./icon/" + description.replace(" ", "") + "-day.png";
    } else {
      return "./icon/" + main + "-day.png";
    }
  };

  const wordFirstLetterCapitalize = (cumle) => {
    const words = cumle.split(" ");
    let returningString = "";
    words.map((word) => {
      returningString =
        returningString + word[0].toUpperCase() + word.substring(1) + " ";
    });
    return returningString;
  };

  const windDegFinder = (windInfo) => {
    if (windInfo === "North") {
      return "rotate(180deg)";
    } else if (windInfo === "North East") {
      return "rotate(225deg)";
    } else if (windInfo === "East") {
      return "rotate(270deg)";
    } else if (windInfo === "South East") {
      return "rotate(315deg)";
    } else if (windInfo === "South") {
      return "rotate(0deg)";
    } else if (windInfo === "South West") {
      return "rotate(45deg)";
    } else if (windInfo === "West") {
      return "rotate(90deg)";
    } else if (windInfo === "North West") {
      return "rotate(135deg)";
    }
  };

  const dateFinder = (timestamp) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const padTo2Digits = (num) => {
      return String(num).padStart(2, "0");
    };

    const date = new Date(timestamp * 1000);
    const returningDate =
      padTo2Digits(date.getDate()) +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear();
    const returningTime =
      padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes());

    return [returningDate, returningTime];
  };

  const decreaseDailyCount = () => {
    if (dailyCount - 1 === -1) {
      setDailyCount(2);
      setDailyCountForArea2(0);
      return;
    }
    if (dailyCountForArea2 - 1 === -1) {
      setDailyCount(1);
      setDailyCountForArea2(2);
      return;
    }
    setDailyCount(dailyCount - 1);
    setDailyCountForArea2(dailyCountForArea2 - 1);
  };

  const increaseDailyCount = () => {
    if (dailyCount + 1 === 3) {
      setDailyCount(0);
      setDailyCountForArea2(1);
      return;
    }
    if (dailyCountForArea2 + 1 === 3) {
      setDailyCount(2);
      setDailyCountForArea2(0);
      return;
    }
    setDailyCount(dailyCount + 1);
    setDailyCountForArea2(dailyCountForArea2 + 1);
  };

  const decreaseHourlyCount = () => {
    if (hourlyCount - 1 === -1) {
      setHourlyCount(47);
      setHourlyCountForArea2(0);
      return;
    }
    if (hourlyCountForArea2 - 1 === -1) {
      setHourlyCount(46);
      setHourlyCountForArea2(47);
      return;
    }
    setHourlyCount(hourlyCount - 1);
    setHourlyCountForArea2(hourlyCountForArea2 - 1);
  };

  const increaseHourlyCount = () => {
    if (hourlyCount + 1 === 48) {
      setHourlyCount(0);
      setHourlyCountForArea2(1);
      return;
    }
    if (hourlyCountForArea2 + 1 === 48) {
      setHourlyCount(47);
      setHourlyCountForArea2(0);
      return;
    }
    setHourlyCount(hourlyCount + 1);
    setHourlyCountForArea2(hourlyCountForArea2 + 1);
  };

  return (
    <div className="weatherPage">
      <div className="weatherPageMainArea">
        <div className="mainLeft">
          <form onSubmit={handleSubmit}>
            <div className="searchArea">
              <button
                type="button"
                onClick={() => handleSearchCity(searchCityName)}
              >
                <img src="./icon/search.png" alt="search"></img>
              </button>
              <input
                onChange={(e) => setSearchCityName(e.target.value)}
                type="text"
                placeholder="Enter City Name"
                value={searchCityName}
                onFocus={() => setRecomendedAreaDisplay(true)}
                onBlur={() => setRecomendedAreaDisplay(false)}
              ></input>
            </div>
            <div
              style={{
                display: recomendedAreaDisplay ? "inline-block" : "none",
              }}
              className="recomendedArea"
            >
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="recomendedAreaChild"
                  onMouseDown={async (e) => {
                    await setSearchCityName(city);
                    await handleSearchCity(city);
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          </form>
          <div
            style={{
              display: recomendedAreaDisplay ? "none" : "flex",
            }}
            className="currentWeatherArea"
          >
            <div className="area1">
              <img
                src={weatherIconChooserForCurrent(
                  weather["daily"][0]["sunrise"],
                  weather["daily"][0]["sunset"],
                  weather["current"]["dt"],
                  weather["current"]["weather"]["main"],
                  weather["current"]["weather"]["description"]
                )}
                alt="search"
              ></img>
              <p>{weather["current"]["temp"]["temp"].split(".")[0]}°C</p>
            </div>
            <div className="area2">
              {wordFirstLetterCapitalize(
                weather["current"]["weather"]["description"]
              )}
            </div>
            <div className="area3">
              <div>
                <img src="./icon/humudity.png" alt="search"></img>
                <p>{weather["current"]["humidity"]}%</p>
              </div>
              <div>
                <img src="./icon/pressure.png" alt="search"></img>
                <p>{weather["current"]["pressure"]}</p>
              </div>
              <div>
                <img
                  className="wind-img"
                  src="./icon/wind-south.png"
                  alt="search"
                  style={{
                    transform: windDegFinder(
                      weather["current"]["wind"]["windDirection"]
                    ),
                  }}
                ></img>
                <p>
                  {weather["current"]["wind"]["windSpeed"]} <small>km/h</small>
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: recomendedAreaDisplay ? "none" : "flex",
            }}
            className="dailyWeatherArea"
          >
            <div className="changeButton">
              <button type="button" onClick={() => decreaseDailyCount()}>
                <img src="./icon/left.png" alt="search"></img>
              </button>
            </div>
            <div className="dailyAndHourlyWeather">
              <p>{dateFinder(weather["daily"][dailyCount]["datetime"])[0]}</p>
              <div className="area1-daily">
                <img
                  src={weatherIconChooser(
                    weather["daily"][dailyCount]["weather"]["main"],
                    weather["daily"][dailyCount]["weather"]["description"]
                  )}
                  alt="search"
                ></img>
                <p>
                  {
                    weather["daily"][dailyCount]["temp"]["temp-max"].split(
                      "."
                    )[0]
                  }{" "}
                  /{" "}
                  {
                    weather["daily"][dailyCount]["temp"]["temp-min"].split(
                      "."
                    )[0]
                  }
                  °C
                </p>
              </div>
              <p>
                {wordFirstLetterCapitalize(
                  weather["daily"][dailyCount]["weather"]["description"]
                )}
              </p>
              <div className="area2-daily">
                <div>
                  <img src="./icon/humudity.png" alt="search"></img>
                  <p>{weather["daily"][dailyCount]["humidity"]}%</p>
                </div>
                <div>
                  <img src="./icon/pressure.png" alt="search"></img>
                  <p>{weather["daily"][dailyCount]["pressure"]}</p>
                </div>
                <div>
                  <img
                    className="wind-img-daily"
                    src="./icon/wind-south.png"
                    alt="search"
                    style={{
                      transform: windDegFinder(
                        weather["daily"][dailyCount]["wind"]["windDirection"]
                      ),
                    }}
                  ></img>
                  <p>
                    {weather["daily"][dailyCount]["wind"]["windSpeed"]}{" "}
                    <small>km/h</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="dailyAndHourlyWeather daily2">
              <p>
                {
                  dateFinder(
                    weather["daily"][dailyCountForArea2]["datetime"]
                  )[0]
                }
              </p>
              <div className="area1-daily">
                <img
                  src={weatherIconChooser(
                    weather["daily"][dailyCountForArea2]["weather"]["main"],
                    weather["daily"][dailyCountForArea2]["weather"][
                      "description"
                    ]
                  )}
                  alt="search"
                ></img>
                <p>
                  {
                    weather["daily"][dailyCountForArea2]["temp"][
                      "temp-max"
                    ].split(".")[0]
                  }{" "}
                  /{" "}
                  {
                    weather["daily"][dailyCountForArea2]["temp"][
                      "temp-min"
                    ].split(".")[0]
                  }
                  °C
                </p>
              </div>
              <p>
                {wordFirstLetterCapitalize(
                  weather["daily"][dailyCountForArea2]["weather"]["description"]
                )}
              </p>
              <div className="area2-daily">
                <div>
                  <img src="./icon/humudity.png" alt="search"></img>
                  <p>{weather["daily"][dailyCountForArea2]["humidity"]}%</p>
                </div>
                <div>
                  <img src="./icon/pressure.png" alt="search"></img>
                  <p>{weather["daily"][dailyCountForArea2]["pressure"]}</p>
                </div>
                <div>
                  <img
                    className="wind-img-daily"
                    src="./icon/wind-south.png"
                    alt="search"
                    style={{
                      transform: windDegFinder(
                        weather["daily"][dailyCountForArea2]["wind"][
                          "windDirection"
                        ]
                      ),
                    }}
                  ></img>
                  <p>
                    {weather["daily"][dailyCountForArea2]["wind"]["windSpeed"]}{" "}
                    <small>km/h</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="changeButton">
              <button type="button" onClick={()=>increaseDailyCount()}>
                <img src="./icon/right.png" alt="search"></img>
              </button>
            </div>
          </div>
          <div
            style={{
              display: recomendedAreaDisplay ? "none" : "flex",
            }}
            className="hourlyWeatherAreaForMobile"
          >
            <div className="changeButton">
              <button type="button" onClick={()=>decreaseHourlyCount()}>
                <img src="./icon/left.png" alt="search"></img>
              </button>
            </div>
            <div className="dailyAndHourlyWeather">
              <p>
                {dateFinder(weather["hourly"][hourlyCount]["dt"])[0]}{" "}
                {dateFinder(weather["hourly"][hourlyCount]["dt"])[1]}
              </p>
              <div className="area1-daily">
                <img
                  src={weatherIconChooser(
                    weather["hourly"][hourlyCount]["weather"]["main"],
                    weather["hourly"][hourlyCount]["weather"]["description"]
                  )}
                  alt="search"
                ></img>
                <p>
                  {weather["hourly"][hourlyCount]["temp"]["temp"].split(".")[0]}
                  °C
                </p>
              </div>
              <p>
                {wordFirstLetterCapitalize(
                  weather["hourly"][hourlyCount]["weather"]["description"]
                )}
              </p>
              <div className="area2-daily">
                <div>
                  <img src="./icon/humudity.png" alt="search"></img>
                  <p>{weather["hourly"][hourlyCount]["humidity"]}%</p>
                </div>
                <div>
                  <img src="./icon/pressure.png" alt="search"></img>
                  <p>{weather["hourly"][hourlyCount]["pressure"]}</p>
                </div>
                <div>
                  <img
                    className="wind-img-daily"
                    src="./icon/wind-south.png"
                    alt="search"
                    style={{
                      transform: windDegFinder(
                        weather["hourly"][hourlyCount]["wind"]["windDirection"]
                      ),
                    }}
                  ></img>
                  <p>
                    {weather["hourly"][hourlyCount]["wind"]["windSpeed"]}{" "}
                    <small>km/h</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="changeButton">
              <button type="button" onClick={()=>increaseHourlyCount()}>
                <img src="./icon/right.png" alt="search"></img>
              </button>
            </div>
          </div>
        </div>
        <div className="mainRight">
          <div className="changeButton">
            <button type="button" onClick={()=>decreaseHourlyCount()}>
              <img src="./icon/top.png" alt="search"></img>
            </button>
          </div>
          <div className="dailyAndHourlyWeather">
            <p>
              {dateFinder(weather["hourly"][hourlyCount]["dt"])[0]}{" "}
              {dateFinder(weather["hourly"][hourlyCount]["dt"])[1]}
            </p>
            <div className="area1-daily">
              <img
                src={weatherIconChooser(
                  weather["hourly"][hourlyCount]["weather"]["main"],
                  weather["hourly"][hourlyCount]["weather"]["description"]
                )}
                alt="search"
              ></img>
              <p>
                {weather["hourly"][hourlyCount]["temp"]["temp"].split(".")[0]}°C
              </p>
            </div>
            <p>
              {wordFirstLetterCapitalize(
                weather["hourly"][hourlyCount]["weather"]["description"]
              )}
            </p>
            <div className="area2-daily">
              <div>
                <img src="./icon/humudity.png" alt="search"></img>
                <p>{weather["hourly"][hourlyCount]["humidity"]}%</p>
              </div>
              <div>
                <img src="./icon/pressure.png" alt="search"></img>
                <p>{weather["hourly"][hourlyCount]["pressure"]}</p>
              </div>
              <div>
                <img
                  className="wind-img-daily"
                  src="./icon/wind-south.png"
                  alt="search"
                  style={{
                    transform: windDegFinder(
                      weather["hourly"][hourlyCount]["wind"]["windDirection"]
                    ),
                  }}
                ></img>
                <p>
                  {weather["hourly"][hourlyCount]["wind"]["windSpeed"]}{" "}
                  <small>km/h</small>
                </p>
              </div>
            </div>
          </div>
          <div className="dailyAndHourlyWeather ">
            <p>
              {dateFinder(weather["hourly"][hourlyCountForArea2]["dt"])[0]}{" "}
              {dateFinder(weather["hourly"][hourlyCountForArea2]["dt"])[1]}
            </p>
            <div className="area1-daily">
              <img
                src={weatherIconChooser(
                  weather["hourly"][hourlyCountForArea2]["weather"]["main"],
                  weather["hourly"][hourlyCountForArea2]["weather"][
                    "description"
                  ]
                )}
                alt="search"
              ></img>
              <p>
                {
                  weather["hourly"][hourlyCountForArea2]["temp"]["temp"].split(
                    "."
                  )[0]
                }
                °C
              </p>
            </div>
            <p>
              {wordFirstLetterCapitalize(
                weather["hourly"][hourlyCountForArea2]["weather"]["description"]
              )}
            </p>
            <div className="area2-daily">
              <div>
                <img src="./icon/humudity.png" alt="search"></img>
                <p>{weather["hourly"][hourlyCountForArea2]["humidity"]}%</p>
              </div>
              <div>
                <img src="./icon/pressure.png" alt="search"></img>
                <p>{weather["hourly"][hourlyCountForArea2]["pressure"]}</p>
              </div>
              <div>
                <img
                  className="wind-img-daily"
                  src="./icon/wind-south.png"
                  alt="search"
                  style={{
                    transform: windDegFinder(
                      weather["hourly"][hourlyCountForArea2]["wind"][
                        "windDirection"
                      ]
                    ),
                  }}
                ></img>
                <p>
                  {weather["hourly"][hourlyCountForArea2]["wind"]["windSpeed"]}{" "}
                  <small>km/h</small>
                </p>
              </div>
            </div>
          </div>

          <div className="changeButton">
            <button type="button" onClick={()=>increaseHourlyCount()}>
              <img src="./icon/down.png" alt="search"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentLocation: state.currentLocationReducer,
    cities: state.citiesReducer,
    lastWeather: state.lastWeatherReducer,
  };
}

const mapDispatchToProps = {
  changeCurrentLocation,
  changeWeatherPageBackground
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
