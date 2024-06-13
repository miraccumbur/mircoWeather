// // const mongo = require('mongo');
// const MongoClient = require('mongodb').MongoClient;
const fetch = require("cross-fetch");
const { ObjectID, ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
  name: String,
  information: {
    imageSize: String,
    licensePlate: String,
  },
  location: {
    latitude: String,
    longitude: String,
  },
  radarArea: {
    areaName: String,
    areaSize: {
      heightTop: Number,
      heightBottom: Number,
      widthLeft: Number,
      widthRight: Number,
    },
  },
});

const weatherSchema = new Schema({
  name: String,
  current: {},
  daily: Array,
  hourly: Array,
});

let cities = mongoose.model("cities", citiesSchema);
let weather = mongoose.model("weather", weatherSchema);
const URL = "mongodb://127.0.0.1:27017/mircoweather";

mongoose.connect(URL, {
  useNewUrlParser: true,
});


const getWeather = () => {
  try {
    cities.find((err, data) => {
      data.map(async (city) => {
        let currentWeather = {};
        let hourlyWeather = [];
        let dailyWeather = [];
        console.log("current:" + currentWeather);
        console.log("hourly:" + hourlyWeather);
        console.log("daily:" + dailyWeather);
        console.log(city.name);

        //current weather operations
        const currentWeatherResponse = await fetch(
          "http://api.openweathermap.org/data/2.5/weather?lat=" +
            city.location.latitude +
            "&lon=" +
            city.location.longitude +
            "&appid=4bea130418e11ef03d28e10bb3dbe90c"
        );
        const currentWeatherData = await currentWeatherResponse.json();
        currentWeather = {
          dt: currentWeatherData.dt,
          humidity: currentWeatherData.main.humidity,
          pressure: currentWeatherData.main.pressure,
          temp: {
            feelsLike: kelvinToCelcius(
              currentWeatherData.main.feels_like
            ).toString(),
            temp: kelvinToCelcius(currentWeatherData.main.temp).toString(),
          },
          weather: {
            main: currentWeatherData.weather[0].main,
            description: currentWeatherData.weather[0].description,
          },
          wind: {
            windDirection: findWindDirection(currentWeatherData.wind.deg),
            windSpeed: currentWeatherData.wind.speed,
          },
        };

        console.log("current weather operation completed");

        //hourly weather operations

        const hourlyWeatherResponse = await fetch(
          "http://api.openweathermap.org/data/2.5/onecall?lat=" +
            city.location.latitude +
            "&lon=" +
            city.location.longitude +
            "&exclude=current,minutely,daily,alerts&appid=4bea130418e11ef03d28e10bb3dbe90c"
        );

        const hourlyWeatherData = await hourlyWeatherResponse.json();
        for (let i = 0; i < 48; i++) {
          hourlyWeather.push({
            dt: hourlyWeatherData.hourly[i].dt,
            dewpoint: kelvinToCelcius(
              hourlyWeatherData.hourly[i].dew_point
            ).toString(),
            humidity: hourlyWeatherData.hourly[i].humidity,
            pressure: hourlyWeatherData.hourly[i].pressure,
            temp: {
              feelsLike: kelvinToCelcius(
                hourlyWeatherData.hourly[i].feels_like
              ).toString(),
              temp: kelvinToCelcius(
                hourlyWeatherData.hourly[i].temp
              ).toString(),
            },
            weather: {
              main: hourlyWeatherData.hourly[i].weather[0].main,
              description: hourlyWeatherData.hourly[i].weather[0].description,
            },
            wind: {
              windDirection: findWindDirection(
                hourlyWeatherData.hourly[i].wind_deg
              ),
              windSpeed: hourlyWeatherData.hourly[i].wind_speed,
            },
          });
        }
        console.log("hourly weather operation completed");
        //daily weather operation
        const dailyWeatherResponse = await fetch(
          "http://api.openweathermap.org/data/2.5/onecall?lat=" +
            city.location.latitude +
            "&lon=" +
            city.location.longitude +
            "&exclude=current,minutely,hourly,alerts&appid=4bea130418e11ef03d28e10bb3dbe90c"
        );

        const dailyWeatherData = await dailyWeatherResponse.json();

        for (let j = 0; j < 5; j++) {
          dailyWeather.push({
            dt: dailyWeatherData.daily[j].dt,
            dewpoint: kelvinToCelcius(
              dailyWeatherData.daily[j].dew_point
            ).toString(),
            humidity: dailyWeatherData.daily[j].humidity,
            pressure: dailyWeatherData.daily[j].pressure,
            sunrise: dailyWeatherData.daily[j].sunrise,
            sunset: dailyWeatherData.daily[j].sunset,
            temp: {
              feelsLikeMax: kelvinToCelcius(
                dailyWeatherData.daily[j].feels_like.day
              ).toString(),
              feelsLikeMin: kelvinToCelcius(
                dailyWeatherData.daily[j].feels_like.morn
              ).toString(),
              tempMax: kelvinToCelcius(
                dailyWeatherData.daily[j].temp.max
              ).toString(),
              tempMin: kelvinToCelcius(
                dailyWeatherData.daily[j].temp.min
              ).toString(),
            },
            weather: {
              main: dailyWeatherData.daily[j].weather[0].main,
              description: dailyWeatherData.daily[j].weather[0].description,
            },
            wind: {
              windDirection: findWindDirection(
                dailyWeatherData.daily[j].wind_deg
              ),
              windSpeed: dailyWeatherData.daily[j].wind_speed,
            },
          });
        }
        console.log("daily weather operation completed");

        weather.create({
          name: city.name,
          current: currentWeather,
          daily: dailyWeather,
          hourly: hourlyWeather,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
getWeather();

const kelvinToCelcius = (kelvin) => {
  return kelvin - 273.15;
};

const findWindDirection = (value) => {
  let windType = "";
  if ((value >= 0 && value <= 1) || (value > 346 && value <= 360)) {
    windType = "North";
  } else if (value >= 16 && value <= 75) {
    windType = "North East";
  } else if (value >= 76 && value <= 105) {
    windType = "East";
  } else if (value >= 106 && value <= 165) {
    windType = "South East";
  } else if (value >= 166 && value <= 195) {
    windType = "South";
  } else if (value >= 196 && value <= 255) {
    windType = "South West";
  } else if (value >= 256 && value <= 285) {
    windType = "South";
  } else if (value > 286 && value <= 345) {
    windType = "North West";
  }
  return windType;
};

const setCityCollection = () => {
  const cityList = [
    ["01", "Adana", "TR31", 84, 380, 180, 423, "36.991421", "35.330830", "max"],
    [
      "02",
      "Adiyaman",
      "TR63",
      312,
      464,
      49,
      267,
      "37.764542",
      "38.276451",
      "max",
    ],
    [
      "03",
      "Afyonkarahisar",
      "TR03",
      245,
      487,
      220,
      559,
      "38.757542",
      "30.538700",
      "max",
    ],
    ["04", "Agri", "TR25", 407, 582, 411, 675, "39.718491", "43.050869", "max"],
    [
      "05",
      "Amasya",
      "TR55",
      410,
      380,
      180,
      423,
      "36.991421",
      "35.330830",
      "max",
    ],
    [
      "06",
      "Ankara",
      "TR06",
      244,
      566,
      81,
      448,
      "39.925533",
      "32.866287",
      "max",
    ],
    [
      "07",
      "Antalya",
      "TR07",
      184,
      460,
      166,
      625,
      "36.884804",
      "30.704044",
      "max",
    ],
    [
      "08",
      "Artvin",
      "TR25",
      174,
      341,
      282,
      436,
      "41.183224",
      "41.830982",
      "max",
    ],
    ["09", "Aydin", "TR48", 198, 340, 148, 410, "37.84501", "27.83963", "max"],
    [
      "10",
      "Balikesir",
      "TR10",
      251,
      505,
      201,
      490,
      "39.653298",
      "27.890342",
      "max",
    ],
    [
      "11",
      "Bilecik",
      "TR16",
      375,
      520,
      290,
      420,
      "40.142573",
      "29.979330",
      "max",
    ],
    [
      "12",
      "Bingol",
      "TR63",
      100,
      295,
      324,
      505,
      "38.885464",
      "40.496625",
      "max",
    ],
    [
      "13",
      "Bitlis",
      "TR25",
      590,
      717,
      320,
      545,
      "38.400569",
      "42.109502",
      "max",
    ],
    ["14", "Bolu", "TR67", 415, 550, 170, 440, "40.732541", "31.608208", "max"],
    [
      "15",
      "Burdur",
      "TR07",
      150,
      330,
      210,
      460,
      "37.7202778",
      "30.2908333",
      "max",
    ],
    ["16", "Bursa", "TR16", 370, 545, 125, 345, "40.18277", "29.06773", "max"],
    [
      "17",
      "Canakkale",
      "TR10",
      250,
      450,
      140,
      365,
      "40.05499",
      "26.92783",
      "max",
    ],
    [
      "18",
      "Cankiri",
      "TR06",
      195,
      335,
      280,
      505,
      "40.66677",
      "33.45261",
      "max",
    ],
    ["19", "Corum", "TR55", 385, 605, 115, 280, "40.56984", "34.72693", "max"],
    [
      "20",
      "Denizli",
      "TR48",
      150,
      390,
      335,
      535,
      "37.77332",
      "29.08693",
      "max",
    ],
    [
      "21",
      "Diyarbakir",
      "TR63",
      240,
      425,
      250,
      505,
      "37.91622",
      "40.23635",
      "max",
    ],
    ["22", "Edirne", "TR34", 280, 505, 60, 210, "41.64644", "26.61443", "max"],
    ["23", "Elazig", "TR63", 170, 320, 145, 405, "38.66481", "39.21473", "max"],
    [
      "24",
      "Erzincan",
      "TR61",
      505,
      700,
      220,
      485,
      "39.69241",
      "39.46691",
      "max",
    ],
    [
      "25",
      "Erzurum",
      "TR25",
      285,
      560,
      170,
      460,
      "39.90632",
      "41.27276",
      "max",
    ],
    [
      "26",
      "Eskisehir",
      "TR16",
      425,
      615,
      320,
      540,
      "39.68212",
      "31.07235",
      "max",
    ],
    [
      "27",
      "Gaziantep",
      "TR27",
      325,
      480,
      235,
      450,
      "36.96663",
      "37.40742",
      "max",
    ],
    [
      "28",
      "Giresun",
      "TR61",
      365,
      570,
      175,
      320,
      "40.91010",
      "38.39185",
      "max",
    ],
    [
      "29",
      "Gümüşhane",
      "TR61",
      410,
      565,
      240,
      425,
      "40.46035",
      "39.47962",
      "max",
    ],
    [
      "30",
      "Hakkari",
      "TR25",
      605,
      700,
      495,
      660,
      "37.56763",
      "43.75080",
      "ppi",
    ],
    ["31", "Hatay", "TR31", 270, 475, 305, 450, "36.19365", "36.15695", "max"],
    [
      "32",
      "Isparta",
      "TR03",
      360,
      555,
      285,
      480,
      "37.74951",
      "30.55202",
      "max",
    ],
    ["33", "Mersin", "TR31", 250, 410, 65, 340, "36.79784", "34.62984", "max"],
    [
      "34",
      "Istanbul",
      "TR34",
      333,
      493,
      265,
      505,
      "41.00963",
      "28.96516",
      "max",
    ],
    ["35", "Izmir", "TR35", 225, 483, 225, 540, "38.41473", "27.14341", "max"],
    ["36", "Kars", "TR25", 240, 455, 360, 670, "40.60353", "43.09707", "max"],
    [
      "37",
      "Kastamonu",
      "TR67",
      260,
      405,
      420,
      595,
      "41.36802",
      "33.76192",
      "ppi",
    ],
    [
      "38",
      "Kayseri",
      "TR58",
      395,
      585,
      175,
      380,
      "38.72253",
      "35.48745",
      "ppi",
    ],
    [
      "39",
      "Kirklareli",
      "TR34",
      265,
      405,
      150,
      325,
      "41.73484",
      "27.22566",
      "max",
    ],
    [
      "40",
      "Kirsehir",
      "TR06",
      370,
      545,
      360,
      545,
      "39.14611",
      "34.16056",
      "max",
    ],
    [
      "41",
      "Kocaeli",
      "TR16",
      270,
      400,
      265,
      400,
      "40.77506",
      "29.94200",
      "max",
    ],
    ["42", "Konya", "TR70", 85, 475, 35, 535, "37.87255", "32.49427", "max"],
    [
      "43",
      "Kutahya",
      "TR03",
      160,
      355,
      120,
      355,
      "39.41991",
      "29.98579",
      "max",
    ],
    ["44", "Malatya", "TR63", 225, 385, 40, 275, "38.34831", "38.31787", "max"],
    ["45", "Manisa", "TR35", 210, 415, 325, 610, "38.61945", "27.44520", "max"],
    [
      "46",
      "Kahramanmaras",
      "TR27",
      170,
      405,
      200,
      435,
      "37.56733",
      "36.94416",
      "max",
    ],
    ["47", "Mardin", "TR63", 385, 535, 290, 565, "37.31084", "40.73773", "max"],
    ["48", "Mugla", "TR48", 270, 510, 170, 525, "37.21284", "28.36458", "max"],
    ["49", "Mus", "TR25", 470, 655, 245, 505, "38.73222", "41.48989", "max"],
    [
      "50",
      "Nevsehir",
      "TR06",
      395,
      540,
      450,
      580,
      "38.62397",
      "34.71405",
      "ppi",
    ],
    ["51", "Nigde", "TR70", 215, 405, 430, 640, "37.97121", "34.67755", "max"],
    ["52", "Ordu", "TR55", 395, 530, 385, 581, "40.97834", "37.89757", "max"],
    ["53", "Rize", "TR61", 345, 485, 415, 545, "41.04549", "40.89984", "max"],
    [
      "54",
      "Sakarya",
      "TR16",
      280,
      435,
      360,
      470,
      "40.75694",
      "30.36654",
      "max",
    ],
    ["55", "Samsun", "TR55", 330, 480, 195, 480, "41.29123", "36.33116", "max"],
    ["56", "Siirt", "TR63", 285, 375, 485, 650, "37.92732", "41.94220", "ppi"],
    ["57", "Sinop", "TR55", 260, 415, 130, 290, "42.02658", "35.15115", "max"],
    ["58", "Sivas", "TR58", 285, 550, 200, 605, "39.75036", "37.01452", "max"],
    [
      "59",
      "Tekirdag",
      "TR34",
      330,
      515,
      130,
      315,
      "40.98067",
      "27.50881",
      "max",
    ],
    ["60", "Tokat", "TR58", 220, 380, 170, 430, "40.32487", "36.54929", "max"],
    [
      "61",
      "Trabzon",
      "TR61",
      377,
      480,
      283,
      450,
      "41.00463",
      "39.71846",
      "max",
    ],
    [
      "62",
      "Tunceli",
      "TR63",
      104,
      255,
      172,
      420,
      "39.10606",
      "39.54827",
      "max",
    ],
    [
      "63",
      "Sanliurfa",
      "TR63",
      330,
      545,
      105,
      390,
      "37.14939",
      "38.79021",
      "max",
    ],
    ["64", "Usak", "TR03", 240, 468, 105, 300, "38.67951", "29.40543", "max"],
    ["65", "Van", "TR25", 430, 630, 440, 640, "38.50953", "43.37749", "ppi"],
    ["66", "Yozgat", "TR58", 310, 515, 0, 260, "39.82220", "34.80810", "max"],
    [
      "67",
      "Zonguldak",
      "TR67",
      320,
      440,
      250,
      400,
      "41.45192",
      "31.79060",
      "max",
    ],
    [
      "68",
      "Aksaray",
      "TR06",
      430,
      580,
      390,
      500,
      "38.37054",
      "34.02691",
      "ppi",
    ],
    [
      "69",
      "Bayburt",
      "TR61",
      455,
      560,
      325,
      500,
      "40.25285",
      "40.22454",
      "max",
    ],
    [
      "70",
      "Karaman",
      "TR70",
      335,
      540,
      265,
      530,
      "37.18161",
      "33.21819",
      "max",
    ],
    [
      "71",
      "Kirikkale",
      "TR06",
      295,
      465,
      340,
      520,
      "39.84427",
      "33.50935",
      "max",
    ],
    ["72", "Batman", "TR63", 236, 446, 436, 576, "37.88359", "41.12775", "max"],
    ["73", "Sirnak", "TR63", 360, 430, 480, 700, "37.51084", "42.45678", "ppi"],
    ["74", "Bartin", "TR67", 285, 390, 340, 490, "41.63384", "32.33844", "max"],
    [
      "75",
      "Ardahan",
      "TR25",
      170,
      331,
      390,
      575,
      "41.10785",
      "42.70699",
      "max",
    ],
    ["76", "Igdir", "TR25", 345, 415, 505, 640, "39.92188", "44.04680", "ppi"],
    ["77", "Yalova", "TR16", 360, 405, 195, 300, "40.65834", "29.27000", "max"],
    [
      "78",
      "Karabuk",
      "TR67",
      320,
      470,
      340,
      515,
      "41.19554",
      "32.62312",
      "max",
    ],
    ["79", "Kilis", "TR27", 395, 470, 265, 410, "36.71742", "37.11564", "max"],
    [
      "80",
      "Osmaniye",
      "TR31",
      165,
      305,
      330,
      450,
      "37.07336",
      "36.25077",
      "max",
    ],
    ["81", "Duzce", "TR67", 390, 470, 215, 345, "40.84586", "31.16485", "max"],
  ];

  cityList.map((city) => {
    cities.create({
      name: city[1],
      information: {
        imageSize: city[9],
        licensePlate: city[0],
      },
      location: {
        latitude: city[7],
        longitude: city[8],
      },
      radarArea: {
        areaName: city[2],
        areaSize: {
          heightTop: city[3],
          heightBottom: city[4],
          widthLeft: city[5],
          widthRight: city[6],
        },
      },
    });
    console.log(city[1], "tamamlandı");
  });
};

// setCityCollection();

// cities.findById(ObjectId("62e58a4f3198b5b416681ce1"),(err,data)=>{
//   console.log(data);
// })

// cities.create({
//   information: {
//     imageSize: "max",
//     licensePlate: "01",
//   },
//   location: {
//     latitude: "36.991421",
//     longitude: "35.330830",
//   },
//   radarArea: {
//     areaName: "TR31",
//     areaSize: {
//       heightTop: 84,
//       heightBottom: 380,
//       widthLeft: 180,
//       widthRight: 423,
//     },
//   },
// })
