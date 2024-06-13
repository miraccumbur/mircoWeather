// Burada initial statelerimizi oluşturuyoruz.

const initialState = {
    loggedUser:window.localStorage.getItem("loggedUser")?JSON.parse(window.localStorage.getItem("loggedUser")):null,
    currentLocation:window.localStorage.getItem("currentLocation")?window.localStorage.getItem("currentLocation"):"Ankara",
    cities:[ "Adana", "Adiyaman", "Afyonkarahisar", "Agri", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydin", "Balikesir", "Bartin", "Batman", "Bayburt", "Bilecik", "Bingol", "Bitlis", "Bolu", "Burdur", "Bursa", "Canakkale", "Cankiri", "Corum", "Denizli", "Diyarbakir", "Duzce", "Edirne", "Elazig", "Erzincan", "Erzurum", "Eskisehir", "Gaziantep", "Giresun", "G\u00fcm\u00fc\u015fhane", "Hakkari", "Hatay", "Igdir", "Isparta", "Istanbul", "Izmir", "Kahramanmaras", "Karabuk", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kirikkale", "Kirklareli", "Kirsehir", "Kocaeli", "Konya", "Kutahya", "Malatya", "Manisa", "Mardin", "Mersin", "Mugla", "Mus", "Nevsehir", "Nigde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Sanliurfa", "Siirt", "Sinop", "Sirnak", "Sivas", "Tekirdag", "Tokat", "Trabzon", "Tunceli", "Usak", "Van", "Yalova", "Yozgat", "Zonguldak" ],
    weatherPageBackground:null,
    lastWeather:window.localStorage.getItem("lastWeather")? JSON.parse(window.localStorage.getItem("lastWeather")):
    {
      
        "current": {
            "dt": 1648996178,
            "humidity": 90,
            "pressure": 1020,
            "temp": {
                "feelsLike": "1.2",
                "temp": "1.2"
            },
            "weather": {
                "description": "broken clouds",
                "main": "Clouds"
            },
            "wind": {
                "windDirection": "South West",
                "windSpeed": 0.09
            }
        },
        "daily": [
            {
                "datetime": 1648976400,
                "dewpoint": "0.5",
                "humidity": 98,
                "pressure": 1023,
                "sunrise": 1648954148,
                "sunset": 1648999969,
                "temp": {
                    "feelsLike-max": "1.5",
                    "feelsLike-min": "-0.0",
                    "temp-max": "1.9",
                    "temp-min": "-7.1"
                },
                "weather": {
                    "description": "clear sky",
                    "main": "Clear"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.87
                }
            },
            {
                "datetime": 1649062800,
                "dewpoint": "1.2",
                "humidity": 100,
                "pressure": 1020,
                "sunrise": 1649040452,
                "sunset": 1649086429,
                "temp": {
                    "feelsLike-max": "1.9",
                    "feelsLike-min": "-0.1",
                    "temp-max": "2.4",
                    "temp-min": "-4.4"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 1.39
                }
            },
            {
                "datetime": 1649149200,
                "dewpoint": "0.9",
                "humidity": 94,
                "pressure": 1021,
                "sunrise": 1649126757,
                "sunset": 1649172888,
                "temp": {
                    "feelsLike-max": "2.6",
                    "feelsLike-min": "-0.6",
                    "temp-max": "3.5",
                    "temp-min": "-0.7"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 2.12
                }
            }
        ],
        "hourly": [
            {
                "dewpoint": "-0.2",
                "dt": 1648994400,
                "humidity": 90,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "1.2",
                    "temp": "1.2"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 0.09
                }
            },
            {
                "dewpoint": "-0.6",
                "dt": 1648998000,
                "humidity": 89,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "0.9",
                    "temp": "0.9"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.51
                }
            },
            {
                "dewpoint": "-1.6",
                "dt": 1649001600,
                "humidity": 87,
                "pressure": 1021,
                "temp": {
                    "feelsLike": "0.1",
                    "temp": "0.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.87
                }
            },
            {
                "dewpoint": "-2.9",
                "dt": 1649005200,
                "humidity": 85,
                "pressure": 1022,
                "temp": {
                    "feelsLike": "-0.9",
                    "temp": "-0.9"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.56
                }
            },
            {
                "dewpoint": "-3.8",
                "dt": 1649008800,
                "humidity": 85,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "-1.8",
                    "temp": "-1.8"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.46
                }
            },
            {
                "dewpoint": "-6.6",
                "dt": 1649012400,
                "humidity": 85,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-3.5",
                    "temp": "-3.5"
                },
                "weather": {
                    "description": "scattered clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.5
                }
            },
            {
                "dewpoint": "-7.2",
                "dt": 1649016000,
                "humidity": 86,
                "pressure": 1025,
                "temp": {
                    "feelsLike": "-4.1",
                    "temp": "-4.1"
                },
                "weather": {
                    "description": "scattered clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.51
                }
            },
            {
                "dewpoint": "-6.8",
                "dt": 1649019600,
                "humidity": 87,
                "pressure": 1025,
                "temp": {
                    "feelsLike": "-3.9",
                    "temp": "-3.9"
                },
                "weather": {
                    "description": "scattered clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.53
                }
            },
            {
                "dewpoint": "-6.7",
                "dt": 1649023200,
                "humidity": 88,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-4.1",
                    "temp": "-4.1"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "",
                    "windSpeed": 0.5
                }
            },
            {
                "dewpoint": "-6.9",
                "dt": 1649026800,
                "humidity": 89,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-4.4",
                    "temp": "-4.4"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.41
                }
            },
            {
                "dewpoint": "-6.6",
                "dt": 1649030400,
                "humidity": 90,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-4.3",
                    "temp": "-4.3"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.44
                }
            },
            {
                "dewpoint": "-6.0",
                "dt": 1649034000,
                "humidity": 91,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-3.8",
                    "temp": "-3.8"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.6
                }
            },
            {
                "dewpoint": "-5.4",
                "dt": 1649037600,
                "humidity": 92,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "-3.3",
                    "temp": "-3.3"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.43
                }
            },
            {
                "dewpoint": "-5.3",
                "dt": 1649041200,
                "humidity": 92,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "-3.2",
                    "temp": "-3.2"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.41
                }
            },
            {
                "dewpoint": "-4.3",
                "dt": 1649044800,
                "humidity": 92,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "-2.3",
                    "temp": "-2.3"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.34
                }
            },
            {
                "dewpoint": "-2.3",
                "dt": 1649048400,
                "humidity": 93,
                "pressure": 1022,
                "temp": {
                    "feelsLike": "-0.6",
                    "temp": "-0.6"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South East",
                    "windSpeed": 0.19
                }
            },
            {
                "dewpoint": "-0.8",
                "dt": 1649052000,
                "humidity": 97,
                "pressure": 1022,
                "temp": {
                    "feelsLike": "0.5",
                    "temp": "0.5"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South East",
                    "windSpeed": 0.3
                }
            },
            {
                "dewpoint": "0.3",
                "dt": 1649055600,
                "humidity": 99,
                "pressure": 1021,
                "temp": {
                    "feelsLike": "1.2",
                    "temp": "1.2"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North West",
                    "windSpeed": 0.42
                }
            },
            {
                "dewpoint": "0.9",
                "dt": 1649059200,
                "humidity": 100,
                "pressure": 1021,
                "temp": {
                    "feelsLike": "1.6",
                    "temp": "1.6"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South",
                    "windSpeed": 0.14
                }
            },
            {
                "dewpoint": "1.2",
                "dt": 1649062800,
                "humidity": 100,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "1.9",
                    "temp": "1.9"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 0.29
                }
            },
            {
                "dewpoint": "1.3",
                "dt": 1649066400,
                "humidity": 100,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "2.1",
                    "temp": "2.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South",
                    "windSpeed": 0.38
                }
            },
            {
                "dewpoint": "1.6",
                "dt": 1649070000,
                "humidity": 100,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "2.4",
                    "temp": "2.4"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South",
                    "windSpeed": 0.83
                }
            },
            {
                "dewpoint": "1.5",
                "dt": 1649073600,
                "humidity": 100,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "1.1",
                    "temp": "2.3"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 1.39
                }
            },
            {
                "dewpoint": "1.5",
                "dt": 1649077200,
                "humidity": 99,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "2.4",
                    "temp": "2.4"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 1.29
                }
            },
            {
                "dewpoint": "1.2",
                "dt": 1649080800,
                "humidity": 98,
                "pressure": 1021,
                "temp": {
                    "feelsLike": "2.1",
                    "temp": "2.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South",
                    "windSpeed": 0.5
                }
            },
            {
                "dewpoint": "-0.1",
                "dt": 1649084400,
                "humidity": 95,
                "pressure": 1021,
                "temp": {
                    "feelsLike": "1.5",
                    "temp": "1.5"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 0.98
                }
            },
            {
                "dewpoint": "-1.1",
                "dt": 1649088000,
                "humidity": 93,
                "pressure": 1022,
                "temp": {
                    "feelsLike": "0.8",
                    "temp": "0.8"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 0.98
                }
            },
            {
                "dewpoint": "-1.4",
                "dt": 1649091600,
                "humidity": 93,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "0.4",
                    "temp": "0.4"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South",
                    "windSpeed": 0.62
                }
            },
            {
                "dewpoint": "-1.9",
                "dt": 1649095200,
                "humidity": 93,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.0",
                    "temp": "-0.0"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South East",
                    "windSpeed": 0.41
                }
            },
            {
                "dewpoint": "-1.9",
                "dt": 1649098800,
                "humidity": 93,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.1",
                    "temp": "-0.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.38
                }
            },
            {
                "dewpoint": "-1.9",
                "dt": 1649102400,
                "humidity": 93,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "-0.1",
                    "temp": "-0.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.78
                }
            },
            {
                "dewpoint": "-2.1",
                "dt": 1649106000,
                "humidity": 93,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.2",
                    "temp": "-0.2"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.84
                }
            },
            {
                "dewpoint": "-2.2",
                "dt": 1649109600,
                "humidity": 92,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.4",
                    "temp": "-0.4"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.53
                }
            },
            {
                "dewpoint": "-2.4",
                "dt": 1649113200,
                "humidity": 93,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.5",
                    "temp": "-0.5"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.27
                }
            },
            {
                "dewpoint": "-2.5",
                "dt": 1649116800,
                "humidity": 92,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.6",
                    "temp": "-0.6"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.49
                }
            },
            {
                "dewpoint": "-2.7",
                "dt": 1649120400,
                "humidity": 92,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.7",
                    "temp": "-0.7"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "East",
                    "windSpeed": 0.65
                }
            },
            {
                "dewpoint": "-2.7",
                "dt": 1649124000,
                "humidity": 92,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.7",
                    "temp": "-0.7"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.64
                }
            },
            {
                "dewpoint": "-2.5",
                "dt": 1649127600,
                "humidity": 92,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.6",
                    "temp": "-0.6"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.43
                }
            },
            {
                "dewpoint": "-2.6",
                "dt": 1649131200,
                "humidity": 90,
                "pressure": 1024,
                "temp": {
                    "feelsLike": "-0.3",
                    "temp": "-0.3"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.31
                }
            },
            {
                "dewpoint": "-1.5",
                "dt": 1649134800,
                "humidity": 92,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "0.5",
                    "temp": "0.5"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.37
                }
            },
            {
                "dewpoint": "-0.5",
                "dt": 1649138400,
                "humidity": 93,
                "pressure": 1023,
                "temp": {
                    "feelsLike": "1.1",
                    "temp": "1.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North East",
                    "windSpeed": 0.51
                }
            },
            {
                "dewpoint": "0.2",
                "dt": 1649142000,
                "humidity": 96,
                "pressure": 1022,
                "temp": {
                    "feelsLike": "1.6",
                    "temp": "1.6"
                },
                "weather": {
                    "description": "broken clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "North West",
                    "windSpeed": 1.3
                }
            },
            {
                "dewpoint": "0.6",
                "dt": 1649145600,
                "humidity": 95,
                "pressure": 1022,
                "temp": {
                    "feelsLike": "2.1",
                    "temp": "2.1"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 0.88
                }
            },
            {
                "dewpoint": "0.9",
                "dt": 1649149200,
                "humidity": 94,
                "pressure": 1021,
                "temp": {
                    "feelsLike": "2.6",
                    "temp": "2.6"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 0.78
                }
            },
            {
                "dewpoint": "1.1",
                "dt": 1649152800,
                "humidity": 93,
                "pressure": 1020,
                "temp": {
                    "feelsLike": "3.0",
                    "temp": "3.0"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 1.02
                }
            },
            {
                "dewpoint": "1.4",
                "dt": 1649156400,
                "humidity": 92,
                "pressure": 1019,
                "temp": {
                    "feelsLike": "1.7",
                    "temp": "3.3"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 1.68
                }
            },
            {
                "dewpoint": "1.6",
                "dt": 1649160000,
                "humidity": 91,
                "pressure": 1019,
                "temp": {
                    "feelsLike": "1.5",
                    "temp": "3.5"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 2.12
                }
            },
            {
                "dewpoint": "1.6",
                "dt": 1649163600,
                "humidity": 92,
                "pressure": 1019,
                "temp": {
                    "feelsLike": "1.7",
                    "temp": "3.5"
                },
                "weather": {
                    "description": "overcast clouds",
                    "main": "Clouds"
                },
                "wind": {
                    "windDirection": "South West",
                    "windSpeed": 1.91
                }
            }
        ]
    } 
      
  
  };

// const getUserFromLocalStorrage = () => {
//     const user = JSON.parse(window.localStorage.getItem("loggedUser"));
//     if (user) {
//       const authControl = async (token) => {
//         const postResponse = await fetch("/userAuthorizationControl", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             token: token,
//           }),
//         });
//         const response = await postResponse.json();
//         return response["value"];
//       };
//         authControl(user["token"]).then((response) => {
//             alert(response)
//           if (response) {
//             return user
//           } else {
            
//             window.localStorage.removeItem("loggedUser");
//             return null
//           }
//         });
//     }
//   };




// getUserFromLocalStorrage();
export default initialState;
