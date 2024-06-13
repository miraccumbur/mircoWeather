// Burada initial statelerimizi oluşturuyoruz.
import AsyncStorage from '@react-native-async-storage/async-storage';

// const loggedUser = async () => {
//   try {
//     const data = await AsyncStorage.getItem('@loggedUser');
//     if (data !== null) {
//       return data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const loggedUser = null;
const changeCurrentCityWeather = {
  _id: '62e5ae2468e03e22e3fab05c',
  name: 'Istanbul',
  current: {
    dt: 1659219492,
    humidity: 83,
    pressure: 1010,
    temp: {
      feelsLike: '25.470000000000027',
      temp: '24.77000000000004',
    },
    weather: {
      main: 'Clouds',
      description: 'few clouds',
    },
    wind: {
      windDirection: 'North East',
      windSpeed: 4.63,
    },
  },
  daily: [
    {
      dt: 1659261600,
      dewpoint: '17.610000000000014',
      humidity: 48,
      pressure: 1009,
      sunrise: 1659236325,
      sunset: 1659288129,
      temp: {
        feelsLikeMax: '30.79000000000002',
        feelsLikeMin: '24.379999999999995',
        tempMax: '30.110000000000014',
        tempMin: '23.480000000000018',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 6.8,
      },
    },
    {
      dt: 1659348000,
      dewpoint: '11.990000000000009',
      humidity: 36,
      pressure: 1010,
      sunrise: 1659322783,
      sunset: 1659374466,
      temp: {
        feelsLikeMax: '28.010000000000048',
        feelsLikeMin: '24.30000000000001',
        tempMax: '29.80000000000001',
        tempMin: '23.439999999999998',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 6.37,
      },
    },
    {
      dt: 1659434400,
      dewpoint: '17.090000000000032',
      humidity: 52,
      pressure: 1011,
      sunrise: 1659409242,
      sunset: 1659460801,
      temp: {
        feelsLikeMax: '28.610000000000014',
        feelsLikeMin: '23.760000000000048',
        tempMax: '28.110000000000014',
        tempMin: '23.100000000000023',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 6.42,
      },
    },
    {
      dt: 1659520800,
      dewpoint: '16.400000000000034',
      humidity: 47,
      pressure: 1011,
      sunrise: 1659495701,
      sunset: 1659547135,
      temp: {
        feelsLikeMax: '29.25',
        feelsLikeMin: '23.140000000000043',
        tempMax: '29.710000000000036',
        tempMin: '22.650000000000034',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 7.54,
      },
    },
    {
      dt: 1659607200,
      dewpoint: '16.74000000000001',
      humidity: 48,
      pressure: 1012,
      sunrise: 1659582160,
      sunset: 1659633467,
      temp: {
        feelsLikeMax: '29.49000000000001',
        feelsLikeMin: '23.810000000000002',
        tempMax: '29.58000000000004',
        tempMin: '23.210000000000036',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 7.72,
      },
    },
  ],
  hourly: [
    {
      dt: 1659218400,
      dewpoint: '21.689999999999998',
      humidity: 83,
      pressure: 1010,
      temp: {
        feelsLike: '25.470000000000027',
        temp: '24.77000000000004',
      },
      weather: {
        main: 'Clouds',
        description: 'few clouds',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.86,
      },
    },
    {
      dt: 1659222000,
      dewpoint: '21.75',
      humidity: 84,
      pressure: 1010,
      temp: {
        feelsLike: '25.340000000000032',
        temp: '24.629999999999995',
      },
      weather: {
        main: 'Clouds',
        description: 'few clouds',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.44,
      },
    },
    {
      dt: 1659225600,
      dewpoint: '21.720000000000027',
      humidity: 85,
      pressure: 1010,
      temp: {
        feelsLike: '25.129999999999995',
        temp: '24.410000000000025',
      },
      weather: {
        main: 'Clouds',
        description: 'few clouds',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.21,
      },
    },
    {
      dt: 1659229200,
      dewpoint: '21.600000000000023',
      humidity: 86,
      pressure: 1010,
      temp: {
        feelsLike: '24.80000000000001',
        temp: '24.090000000000032',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.97,
      },
    },
    {
      dt: 1659232800,
      dewpoint: '21.5',
      humidity: 87,
      pressure: 1010,
      temp: {
        feelsLike: '24.5',
        temp: '23.79000000000002',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.87,
      },
    },
    {
      dt: 1659236400,
      dewpoint: '21.340000000000032',
      humidity: 88,
      pressure: 1010,
      temp: {
        feelsLike: '24.180000000000007',
        temp: '23.480000000000018',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.67,
      },
    },
    {
      dt: 1659240000,
      dewpoint: '21.27000000000004',
      humidity: 86,
      pressure: 1010,
      temp: {
        feelsLike: '24.379999999999995',
        temp: '23.710000000000036',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.54,
      },
    },
    {
      dt: 1659243600,
      dewpoint: '20.78000000000003',
      humidity: 78,
      pressure: 1010,
      temp: {
        feelsLike: '25.450000000000045',
        temp: '24.870000000000005',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.23,
      },
    },
    {
      dt: 1659247200,
      dewpoint: '19.74000000000001',
      humidity: 67,
      pressure: 1010,
      temp: {
        feelsLike: '26.33000000000004',
        temp: '26.33000000000004',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.63,
      },
    },
    {
      dt: 1659250800,
      dewpoint: '18.970000000000027',
      humidity: 60,
      pressure: 1010,
      temp: {
        feelsLike: '28.860000000000014',
        temp: '27.590000000000032',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.8,
      },
    },
    {
      dt: 1659254400,
      dewpoint: '18.350000000000023',
      humidity: 54,
      pressure: 1010,
      temp: {
        feelsLike: '29.700000000000045',
        temp: '28.670000000000016',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 4.4,
      },
    },
    {
      dt: 1659258000,
      dewpoint: '17.879999999999995',
      humidity: 50,
      pressure: 1009,
      temp: {
        feelsLike: '30.370000000000005',
        temp: '29.53000000000003',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 5.01,
      },
    },
    {
      dt: 1659261600,
      dewpoint: '17.610000000000014',
      humidity: 48,
      pressure: 1009,
      temp: {
        feelsLike: '30.79000000000002',
        temp: '30.03000000000003',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 6.38,
      },
    },
    {
      dt: 1659265200,
      dewpoint: '17.439999999999998',
      humidity: 47,
      pressure: 1009,
      temp: {
        feelsLike: '30.75',
        temp: '30.110000000000014',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 6.76,
      },
    },
    {
      dt: 1659268800,
      dewpoint: '17.5',
      humidity: 47,
      pressure: 1009,
      temp: {
        feelsLike: '30.680000000000007',
        temp: '30.060000000000002',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 6.8,
      },
    },
    {
      dt: 1659272400,
      dewpoint: '17.390000000000043',
      humidity: 48,
      pressure: 1008,
      temp: {
        feelsLike: '30.420000000000016',
        temp: '29.77000000000004',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 6.54,
      },
    },
    {
      dt: 1659276000,
      dewpoint: '17.30000000000001',
      humidity: 48,
      pressure: 1008,
      temp: {
        feelsLike: '29.890000000000043',
        temp: '29.370000000000005',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 5.76,
      },
    },
    {
      dt: 1659279600,
      dewpoint: '17.24000000000001',
      humidity: 49,
      pressure: 1008,
      temp: {
        feelsLike: '29.439999999999998',
        temp: '28.920000000000016',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 5.71,
      },
    },
    {
      dt: 1659283200,
      dewpoint: '17.170000000000016',
      humidity: 51,
      pressure: 1008,
      temp: {
        feelsLike: '28.74000000000001',
        temp: '28.170000000000016',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 5.45,
      },
    },
    {
      dt: 1659286800,
      dewpoint: '17.58000000000004',
      humidity: 56,
      pressure: 1008,
      temp: {
        feelsLike: '28',
        temp: '27.170000000000016',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 4.84,
      },
    },
    {
      dt: 1659290400,
      dewpoint: '18.03000000000003',
      humidity: 60,
      pressure: 1009,
      temp: {
        feelsLike: '26.410000000000025',
        temp: '26.410000000000025',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 4.27,
      },
    },
    {
      dt: 1659294000,
      dewpoint: '18.230000000000018',
      humidity: 62,
      pressure: 1009,
      temp: {
        feelsLike: '26.07000000000005',
        temp: '26.07000000000005',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.82,
      },
    },
    {
      dt: 1659297600,
      dewpoint: '18.5',
      humidity: 65,
      pressure: 1010,
      temp: {
        feelsLike: '25.870000000000005',
        temp: '25.560000000000002',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.15,
      },
    },
    {
      dt: 1659301200,
      dewpoint: '18.850000000000023',
      humidity: 68,
      pressure: 1010,
      temp: {
        feelsLike: '25.420000000000016',
        temp: '25.08000000000004',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 3.25,
      },
    },
    {
      dt: 1659304800,
      dewpoint: '19.07000000000005',
      humidity: 71,
      pressure: 1010,
      temp: {
        feelsLike: '25.120000000000005',
        temp: '24.74000000000001',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 3.5,
      },
    },
    {
      dt: 1659308400,
      dewpoint: '19.590000000000032',
      humidity: 75,
      pressure: 1010,
      temp: {
        feelsLike: '24.730000000000018',
        temp: '24.29000000000002',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North',
        windSpeed: 3.27,
      },
    },
    {
      dt: 1659312000,
      dewpoint: '19.939999999999998',
      humidity: 78,
      pressure: 1010,
      temp: {
        feelsLike: '24.49000000000001',
        temp: '24',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.49,
      },
    },
    {
      dt: 1659315600,
      dewpoint: '19.920000000000016',
      humidity: 79,
      pressure: 1010,
      temp: {
        feelsLike: '24.33000000000004',
        temp: '23.83000000000004',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.22,
      },
    },
    {
      dt: 1659319200,
      dewpoint: '20.07000000000005',
      humidity: 81,
      pressure: 1009,
      temp: {
        feelsLike: '24.120000000000005',
        temp: '23.590000000000032',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 1.65,
      },
    },
    {
      dt: 1659322800,
      dewpoint: '20.25',
      humidity: 82,
      pressure: 1009,
      temp: {
        feelsLike: '23.980000000000018',
        temp: '23.439999999999998',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 1.44,
      },
    },
    {
      dt: 1659326400,
      dewpoint: '20',
      humidity: 80,
      pressure: 1010,
      temp: {
        feelsLike: '24.30000000000001',
        temp: '23.78000000000003',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 1.45,
      },
    },
    {
      dt: 1659330000,
      dewpoint: '18.890000000000043',
      humidity: 69,
      pressure: 1010,
      temp: {
        feelsLike: '25.350000000000023',
        temp: '24.99000000000001',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 2.52,
      },
    },
    {
      dt: 1659333600,
      dewpoint: '15.640000000000043',
      humidity: 52,
      pressure: 1010,
      temp: {
        feelsLike: '26.660000000000025',
        temp: '26.660000000000025',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 4.1,
      },
    },
    {
      dt: 1659337200,
      dewpoint: '14.28000000000003',
      humidity: 44,
      pressure: 1010,
      temp: {
        feelsLike: '27.5',
        temp: '27.510000000000048',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 5.08,
      },
    },
    {
      dt: 1659340800,
      dewpoint: '13.450000000000045',
      humidity: 41,
      pressure: 1010,
      temp: {
        feelsLike: '27.83000000000004',
        temp: '28.110000000000014',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 5.67,
      },
    },
    {
      dt: 1659344400,
      dewpoint: '11.970000000000027',
      humidity: 36,
      pressure: 1010,
      temp: {
        feelsLike: '27.870000000000005',
        temp: '28.55000000000001',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North',
        windSpeed: 6.32,
      },
    },
    {
      dt: 1659348000,
      dewpoint: '11.990000000000009',
      humidity: 36,
      pressure: 1010,
      temp: {
        feelsLike: '28.010000000000048',
        temp: '28.710000000000036',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 6.37,
      },
    },
    {
      dt: 1659351600,
      dewpoint: '11.400000000000034',
      humidity: 34,
      pressure: 1010,
      temp: {
        feelsLike: '28.150000000000034',
        temp: '29.03000000000003',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: '',
        windSpeed: 5.91,
      },
    },
    {
      dt: 1659355200,
      dewpoint: '10.840000000000032',
      humidity: 32,
      pressure: 1009,
      temp: {
        feelsLike: '28.370000000000005',
        temp: '29.430000000000007',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 5.44,
      },
    },
    {
      dt: 1659358800,
      dewpoint: '11.080000000000041',
      humidity: 32,
      pressure: 1009,
      temp: {
        feelsLike: '28.710000000000036',
        temp: '29.80000000000001',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 4.67,
      },
    },
    {
      dt: 1659362400,
      dewpoint: '11.200000000000045',
      humidity: 32,
      pressure: 1009,
      temp: {
        feelsLike: '28.700000000000045',
        temp: '29.78000000000003',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 4.05,
      },
    },
    {
      dt: 1659366000,
      dewpoint: '10.910000000000025',
      humidity: 32,
      pressure: 1009,
      temp: {
        feelsLike: '28.670000000000016',
        temp: '29.75',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 4.04,
      },
    },
    {
      dt: 1659369600,
      dewpoint: '10.770000000000039',
      humidity: 32,
      pressure: 1009,
      temp: {
        feelsLike: '28.27000000000004',
        temp: '29.32000000000005',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.61,
      },
    },
    {
      dt: 1659373200,
      dewpoint: '11.010000000000048',
      humidity: 34,
      pressure: 1009,
      temp: {
        feelsLike: '27.760000000000048',
        temp: '28.57000000000005',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'East',
        windSpeed: 2.79,
      },
    },
    {
      dt: 1659376800,
      dewpoint: '11.200000000000045',
      humidity: 36,
      pressure: 1009,
      temp: {
        feelsLike: '27.29000000000002',
        temp: '27.850000000000023',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.03,
      },
    },
    {
      dt: 1659380400,
      dewpoint: '11.430000000000007',
      humidity: 38,
      pressure: 1010,
      temp: {
        feelsLike: '26.850000000000023',
        temp: '27.120000000000005',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 2.66,
      },
    },
    {
      dt: 1659384000,
      dewpoint: '12.260000000000048',
      humidity: 42,
      pressure: 1010,
      temp: {
        feelsLike: '26.210000000000036',
        temp: '26.210000000000036',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.29,
      },
    },
    {
      dt: 1659387600,
      dewpoint: '13.890000000000043',
      humidity: 49,
      pressure: 1011,
      temp: {
        feelsLike: '25.220000000000027',
        temp: '25.350000000000023',
      },
      weather: {
        main: 'Clear',
        description: 'clear sky',
      },
      wind: {
        windDirection: 'North East',
        windSpeed: 3.36,
      },
    },
  ],
  __v: 0,
};
const cities = [
  'Afyonkarahisar',
  'Adana',
  'Amasya',
  'Ankara',
  'Antalya',
  'Artvin',
  'Aydin',
  'Balikesir',
  'Bilecik',
  'Adiyaman',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Agri',
  'Canakkale',
  'Cankiri',
  'Corum',
  'Denizli',
  'Diyarbakir',
  'Edirne',
  'Elazig',
  'Erzincan',
  'Erzurum',
  'Eskisehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkari',
  'Hatay',
  'Isparta',
  'Bingol',
  'Istanbul',
  'Izmir',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Bursa',
  'Kirsehir',
  'Kocaeli',
  'Konya',
  'Kutahya',
  'Malatya',
  'Manisa',
  'Kahramanmaras',
  'Mardin',
  'Mugla',
  'Mus',
  'Nevsehir',
  'Nigde',
  'Ordu',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Tekirdag',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Sanliurfa',
  'Usak',
  'Van',
  'Yozgat',
  'Zonguldak',
  'Aksaray',
  'Bayburt',
  'Karaman',
  'Kirikkale',
  'Batman',
  'Sirnak',
  'Bartin',
  'Ardahan',
  'Igdir',
  'Yalova',
  'Karabuk',
  'Kilis',
  'Osmaniye',
  'Duzce',
  'Mersin',
  'Kirklareli',
];

module.exports = {
  loggedUser,
  cities,
  changeCurrentCityWeather,
};
