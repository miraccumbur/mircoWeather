import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {turkishToEnglish} from '../function';
import magicString from '../magicString';
import {changeCurrentCityWeather} from '../redux/actions/changeCurrentCityWeather';

const windowWidth = Dimensions.get('window').width;

const WeatherPage = ({
  citiesReducer,
  changeCurrentCityWeather,
  changeCurrentCityWeatherReducer,
}) => {
  const [recomendedAreaDisplay, setRecomendedAreaDisplay] = useState(false);
  const [handleCity, setHandleCity] = useState('');
  const [filteredCity, setFilteredCity] = useState(null);
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');
  const [backgroundPhoto, setBackgroundPhoto] = useState(
    require('../assets/background-photos/main.jpg'),
  );

  const backgroundControl = (sunrise, sunset, dt, main) => {
    const backgroundData = {
      Ash_Day: require('../assets/background-photos/Ash-day.jpg'),
      Ash_Night: require('../assets/background-photos/Ash-night.jpg'),
      Clear_Day: require('../assets/background-photos/Clear-day.jpg'),
      Clear_Night: require('../assets/background-photos/Clear-night.jpg'),
      Clouds_Day: require('../assets/background-photos/Clouds-day.jpg'),
      Clouds_Night: require('../assets/background-photos/Clouds-night.jpg'),
      Drizzle_Day: require('../assets/background-photos/Drizzle-day.jpg'),
      Dirzzle_Night: require('../assets/background-photos/Drizzle-night.jpg'),
      Dust_Day: require('../assets/background-photos/Dust-day.jpg'),
      Dust_Night: require('../assets/background-photos/Dust-night.jpg'),
      Fog_Day: require('../assets/background-photos/Fog-day.jpg'),
      Fog_Night: require('../assets/background-photos/Fog-night.jpg'),
      Haze_Day: require('../assets/background-photos/Haze-day.jpg'),
      Haze_Night: require('../assets/background-photos/Haze-night.jpg'),
      Mist_Day: require('../assets/background-photos/Mist-day.jpg'),
      Mist_Night: require('../assets/background-photos/Mist-night.jpg'),
      Rain_Day: require('../assets/background-photos/Rain-day.jpg'),
      Rain_Night: require('../assets/background-photos/Rain-night.jpg'),
      Sand_Day: require('../assets/background-photos/Sand-day.jpg'),
      Sand_Night: require('../assets/background-photos/Sand-night.jpg'),
      Smoke_Day: require('../assets/background-photos/Smoke-day.jpg'),
      Smoke_Night: require('../assets/background-photos/Smoke-night.jpg'),
      Snow_Day: require('../assets/background-photos/Snow-day.jpg'),
      Snow_Night: require('../assets/background-photos/Snow-night.jpg'),
      Squall_Day: require('../assets/background-photos/Squall-day.jpg'),
      Squall_Night: require('../assets/background-photos/Squall-night.jpg'),
      Thunderstorm_Day: require('../assets/background-photos/Thunderstorm-day.jpg'),
      Thunderstorm_Night: require('../assets/background-photos/Thunderstorm-night.jpg'),
      Tornado_Day: require('../assets/background-photos/Tornado-day.jpg'),
      Tornado_Night: require('../assets/background-photos/Tornado-night.jpg'),
    };

    console.log('sunrise:' + sunrise);
    console.log('sunset:' + sunset);
    if (sunrise < dt && sunset > dt) {
      return backgroundData[main + '_Day'];
    } else {
      return backgroundData[main + '_Night'];
    }
  };

  useEffect(() => {
    setHandleCity(changeCurrentCityWeatherReducer.name);
    // backgroundControl(
    //   changeCurrentCityWeatherReducer.current.sunrise,
    //   changeCurrentCityWeatherReducer.current.sunset,
    //   changeCurrentCityWeatherReducer.current.dt,
    //   changeCurrentCityWeatherReducer.current.weather.main,
    // );
  }, [changeCurrentCityWeatherReducer]);

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    const cityArray = [];
    citiesReducer.map(city => {
      if (city.includes(turkishToEnglish(handleCity))) cityArray.push(city);
    });

    setFilteredCity(cityArray);
  }, [citiesReducer, handleCity]);

  const getWeather = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/getWeather/city=' + handleCity,
      );

      const data = await response.json();
      if (data.code === 200) {
        changeCurrentCityWeather(data.data);
      } else {
        throw magicString.SOMETHING_IS_WRONG;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const capitalizeFirstLetter = str => {
    const arr = str.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ');
  };

  const currentWeatherIconChooser = (
    sunrise,
    sunset,
    dt,
    main,
    description,
    type,
  ) => {
    const data = {
      Drizzle_Day: require('../assets/icons/Drizzle-day.png'),
      Drizzle_Night: require('../assets/icons/Drizzle-night.png'),
      Ash_Day: require('../assets/icons/Ash-day.png'),
      Ash_Night: require('../assets/icons/Ash-night.png'),
      brokenclouds_Day: require('../assets/icons/brokenclouds-day.png'),
      brokenclouds_Night: require('../assets/icons/brokenclouds-night.png'),
      Clear_Day: require('../assets/icons/Clear-day.png'),
      Clear_Night: require('../assets/icons/Clear-night.png'),
      Dust_Day: require('../assets/icons/Dust-day.png'),
      Dust_Night: require('../assets/icons/Dust-night.png'),
      fewclouds_Day: require('../assets/icons/fewclouds-day.png'),
      fewclouds_Night: require('../assets/icons/fewclouds-night.png'),
      Fog_Day: require('../assets/icons/Fog-day.png'),
      Fog_Night: require('../assets/icons/Fog-night.png'),
      Haze_Day: require('../assets/icons/Haze-day.png'),
      Haze_Night: require('../assets/icons/Haze-night.png'),
      Mist_Day: require('../assets/icons/Mist-day.png'),
      Mist_Night: require('../assets/icons/Mist-night.png'),
      overcastclouds_Day: require('../assets/icons/overcastclouds-day.png'),
      overcastclouds_Night: require('../assets/icons/overcastclouds-night.png'),
      Rain_Day: require('../assets/icons/Rain-day.png'),
      Rain_Night: require('../assets/icons/Rain-night.png'),
      Sand_Day: require('../assets/icons/Sand-day.png'),
      Sand_Night: require('../assets/icons/Sand-night.png'),
      scatteredclouds_Day: require('../assets/icons/scatteredclouds-day.png'),
      scatteredclouds_Night: require('../assets/icons/scatteredclouds-night.png'),
      Smoke_Day: require('../assets/icons/Smoke-day.png'),
      Smoke_Night: require('../assets/icons/Smoke-night.png'),
      Snow_Day: require('../assets/icons/Snow-day.png'),
      Snow_Night: require('../assets/icons/Snow-night.png'),
      Squall_Day: require('../assets/icons/Squall-day.png'),
      Squall_Night: require('../assets/icons/Squall-night.png'),
      Thunderstorm_Day: require('../assets/icons/Thunderstorm-day.png'),
      Thunderstorm_Night: require('../assets/icons/Thunderstorm-night.png'),
      Tornado_Day: require('../assets/icons/Tornado-day.png'),
      Tornado_Night: require('../assets/icons/Tornado-night.png'),
    };

    if (type === 'current') {
      if (sunrise < dt && sunset > dt) {
        if (main === 'Clouds') {
          return data[description.replace(' ', '') + '_Day'];
        } else {
          return data[main + '_Day'];
        }
      } else {
        if (main === 'Clouds') {
          return data[description.replace(' ', '') + '_Night'];
        } else {
          return data[main + '_Night'];
        }
      }
    } else {
      if (main === 'Clouds') {
        return data[description.replace(' ', '') + '_Day'];
      } else {
        return data[main + '_Day'];
      }
    }
  };
  const dateFinder = (timestamp, withTime) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const padTo2Digits = num => {
      return String(num).padStart(2, '0');
    };

    const date = new Date(timestamp * 1000);
    const returningDate =
      padTo2Digits(date.getDate()) +
      ' ' +
      monthNames[date.getMonth()] +
      ' ' +
      date.getFullYear();
    const returningTime =
      padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes());
    if (withTime) return returningDate + ' ' + returningTime;
    return returningDate;
  };

  const windDegFinder = windInfo => {
    if (windInfo === 'North') {
      return {rotate: '180deg'};
    } else if (windInfo === 'North East') {
      return {rotate: '225deg'};
    } else if (windInfo === 'East') {
      return {rotate: '270deg'};
    } else if (windInfo === 'South East') {
      return {rotate: '315deg'};
    } else if (windInfo === 'South') {
      return {rotate: '0deg'};
    } else if (windInfo === 'South West') {
      return {rotate: '45deg'};
    } else if (windInfo === 'West') {
      return {rotate: '90deg'};
    } else if (windInfo === 'North West') {
      return {rotate: '135deg'};
    }
    return {rotate: '0deg'};
  };

  const DailyWeatherArea = ({item}) => {
    return (
      <View style={styles.dailyAndHourlyWeatherAreaView}>
        <Text style={styles.dailyAndHourlyWeatherAreaDateText}>
          {dateFinder(item.dt, false)}
        </Text>
        <View style={styles.dailyAndHourlyWeatherWeatherArea}>
          <Image
            source={currentWeatherIconChooser(
              '',
              '',
              '',
              item.weather.main,
              item.weather.description,
              'daily',
            )}
            style={styles.dailyAndHorlyWeatherIcon}
          />
          <Text style={styles.dailyAndHourlyWeatherDegreeText}>
            {Math.floor(item.temp.tempMax)} / {Math.floor(item.temp.tempMin)} °C
          </Text>
        </View>
        <Text style={styles.dailyAndHourlyWeatherDescription}>
          {capitalizeFirstLetter(item.weather.description)}
        </Text>
        <View style={styles.dailyAndHourlyWeatherDown}>
          <View style={styles.dailyAndHourlyWeatherAnotherInfoArea}>
            <Image
              source={require('../assets/icons/humudity.png')}
              style={styles.dailyAndHourlyWeatherAnotherInfoIcon}
            />
            <Text style={styles.dailyAndHourlyWeatherAnotherInfoText}>
              {item.humidity} %
            </Text>
          </View>
          <View style={styles.dailyAndHourlyWeatherAnotherInfoArea}>
            <Image
              source={require('../assets/icons/pressure.png')}
              style={styles.dailyAndHourlyWeatherAnotherInfoIcon}
            />
            <Text style={styles.dailyAndHourlyWeatherAnotherInfoText}>
              {item.pressure}
            </Text>
          </View>
          <View style={styles.dailyAndHourlyWeatherAnotherInfoArea}>
            <Image
              source={require('../assets/icons/wind.png')}
              style={[
                styles.dailyAndHourlyWeatherAnotherInfoIcon,
                {
                  transform: [windDegFinder(item.wind.windDirection)],
                },
              ]}
            />
            <Text style={styles.dailyAndHourlyWeatherAnotherInfoText}>
              {Math.floor(item.wind.windSpeed)}{' '}
              <Text style={{fontSize: 10, letterSpacing: 0.1}}>km/h</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const HourlyWeatherArea = ({item}) => {
    return (
      <View style={styles.dailyAndHourlyWeatherAreaView}>
        <Text style={styles.dailyAndHourlyWeatherAreaDateText}>
          {dateFinder(item.dt, true)}
        </Text>
        <View style={styles.dailyAndHourlyWeatherWeatherArea}>
          <Image
            source={currentWeatherIconChooser(
              '',
              '',
              '',
              item.weather.main,
              item.weather.description,
              'daily',
            )}
            style={styles.dailyAndHorlyWeatherIcon}
          />
          <Text style={styles.dailyAndHourlyWeatherDegreeText}>
            {Math.floor(item.temp.temp)} °C
          </Text>
        </View>
        <Text style={styles.dailyAndHourlyWeatherDescription}>
          {capitalizeFirstLetter(item.weather.description)}
        </Text>
        <View style={styles.dailyAndHourlyWeatherDown}>
          <View style={styles.dailyAndHourlyWeatherAnotherInfoArea}>
            <Image
              source={require('../assets/icons/humudity.png')}
              style={styles.dailyAndHourlyWeatherAnotherInfoIcon}
            />
            <Text style={styles.dailyAndHourlyWeatherAnotherInfoText}>
              {item.humidity} %
            </Text>
          </View>
          <View style={styles.dailyAndHourlyWeatherAnotherInfoArea}>
            <Image
              source={require('../assets/icons/pressure.png')}
              style={styles.dailyAndHourlyWeatherAnotherInfoIcon}
            />
            <Text style={styles.dailyAndHourlyWeatherAnotherInfoText}>
              {item.pressure}
            </Text>
          </View>
          <View style={styles.dailyAndHourlyWeatherAnotherInfoArea}>
            <Image
              source={require('../assets/icons/wind.png')}
              style={[
                styles.dailyAndHourlyWeatherAnotherInfoIcon,
                {
                  transform: [windDegFinder(item.wind.windDirection)],
                },
              ]}
            />
            <Text style={styles.dailyAndHourlyWeatherAnotherInfoText}>
              {Math.floor(item.wind.windSpeed)}{' '}
              <Text style={{fontSize: 10, letterSpacing: 0.1}}>km/h</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  console.log(changeCurrentCityWeatherReducer);

  return (
    <ImageBackground
      source={backgroundControl(
        changeCurrentCityWeatherReducer.daily[0].sunrise,
        changeCurrentCityWeatherReducer.daily[0].sunset,
        changeCurrentCityWeatherReducer.current.dt,
        changeCurrentCityWeatherReducer.current.weather.main,
      )}
      style={styles.container}>
      <Header />
      <SafeAreaView style={styles.SafeAreaStyle}>
        <View style={styles.weatherArea}>
          <View style={styles.searchArea}>
            <TouchableOpacity onPress={() => getWeather()}>
              <Image
                style={styles.searchImage}
                source={require('../assets/icons/search.png')}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder="Your City"
              value={handleCity}
              onChangeText={setHandleCity}
              onFocus={() => setRecomendedAreaDisplay(true)}
              onBlur={() => setRecomendedAreaDisplay(false)}
              onChange={() => setRecomendedAreaDisplay(true)}
            />
          </View>
          {recomendedAreaDisplay ? (
            <ScrollView style={styles.recomendedArea}>
              {filteredCity.map(city => (
                <Text
                  style={styles.recomendedCity}
                  onPressIn={() => setHandleCity(city)}
                  onPress={() => getWeather()}
                  onPressOut={() => setRecomendedAreaDisplay(false)}
                  key={city}>
                  {city}
                </Text>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.weatherSection}>
              <View style={styles.currentWeatherView}>
                <View style={styles.currentWeatherViewUp}>
                  <View style={styles.currentWeatherIconView}>
                    <Image
                      source={currentWeatherIconChooser(
                        changeCurrentCityWeatherReducer.daily[0].sunrise,
                        changeCurrentCityWeatherReducer.daily[0].sunset,
                        changeCurrentCityWeatherReducer.current.dt,
                        changeCurrentCityWeatherReducer.current.weather.main,
                        changeCurrentCityWeatherReducer.current.weather
                          .description,
                        'current',
                      )}
                      style={styles.currentWeatherIcon}
                    />
                  </View>

                  <Text style={styles.currentWeatherDegreeText}>
                    {Math.floor(
                      changeCurrentCityWeatherReducer.current.temp.temp,
                    )}
                    °C
                  </Text>
                </View>
                <View style={styles.currentWeatherViewCenter}>
                  <Text style={styles.currentWeatherText}>
                    {capitalizeFirstLetter(
                      changeCurrentCityWeatherReducer.current.weather
                        .description,
                    )}
                  </Text>
                </View>
                <View style={styles.currentWeatherViewDown}>
                  <View style={styles.currentWeatherAnotherInfoArea}>
                    <Image
                      source={require('../assets/icons/humudity.png')}
                      style={styles.currentWeatherAnotherInfoIcon}
                    />
                    <Text style={styles.currentWeatherAnotherInfoText}>
                      {changeCurrentCityWeatherReducer.current.humidity} %
                    </Text>
                  </View>
                  <View style={styles.currentWeatherAnotherInfoArea}>
                    <Image
                      source={require('../assets/icons/pressure.png')}
                      style={styles.currentWeatherAnotherInfoIcon}
                    />
                    <Text style={styles.currentWeatherAnotherInfoText}>
                      {changeCurrentCityWeatherReducer.current.pressure}
                    </Text>
                  </View>
                  <View style={styles.currentWeatherAnotherInfoArea}>
                    <Image
                      source={require('../assets/icons/wind.png')}
                      style={[
                        styles.currentWeatherAnotherInfoIcon,
                        {
                          transform: [
                            windDegFinder(
                              changeCurrentCityWeatherReducer.current.wind
                                .windDirection,
                            ),
                          ],
                        },
                      ]}
                    />
                    <Text style={styles.currentWeatherAnotherInfoText}>
                      {Math.floor(
                        changeCurrentCityWeatherReducer.current.wind.windSpeed,
                      )}{' '}
                      <Text style={{fontSize: 10, letterSpacing: 0.1}}>
                        km/h
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <FlatList
                data={changeCurrentCityWeatherReducer.daily}
                renderItem={({item}) => <DailyWeatherArea item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                scrollEnabled={true}
                pagingEnabled
                bounces={false}
                keyExtractor={item => item.dt}
                style={{maxHeight: 175}}
              />
              <FlatList
                data={changeCurrentCityWeatherReducer.hourly}
                renderItem={({item}) => <HourlyWeatherArea item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                scrollEventThrottle={32}
                pagingEnabled
                bounces={false}
                keyExtractor={item => item.dt}
                style={{maxHeight: 175}}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    resizeMode: 'contain',
  },
  SafeAreaStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherArea: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: '85%',
    height: 600,
    marginVertical: 50,
    position: 'relative',
  },
  searchArea: {
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  searchImage: {
    width: 24,
    height: 24,
  },
  searchInput: {
    height: 30,
    width: '85%',
    color: 'rgba(256,256,256,0.8)',
    fontSize: 16,
    letterSpacing: 1.3,
    fontWeight: '300',
  },
  recomendedArea: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  recomendedCity: {
    width: '100%',
    height: 30,
    color: 'rgba(256,256,256,0.8)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    letterSpacing: 1.1,
    fontWeight: '300',
  },
  weatherSection: {
    width: '100%',
    height: '100%',
  },
  currentWeatherView: {
    width: '100%',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  currentWeatherViewUp: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  currentWeatherViewCenter: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentWeatherViewDown: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
  },
  currentWeatherIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  currentWeatherDegreeText: {
    fontSize: 48,
    fontWeight: '300',
    color: 'rgba(256,256,256,0.8)',
    letterSpacing: 1.8,
  },
  currentWeatherText: {
    fontSize: 22,
    color: 'rgba(256,256,256,0.8)',
    letterSpacing: 1.2,
  },
  currentWeatherAnotherInfoArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  currentWeatherAnotherInfoIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  currentWeatherAnotherInfoText: {
    color: 'rgba(256,256,256,0.8)',
    fontSize: 14,
    letterSpacing: 1.3,
  },
  currentWeatherIconView: {
    width: 70,
    height: 70,
  },
  dailyAndHourlyWeatherAreaView: {
    position: 'relative',
    width: windowWidth * 0.85,
    height: 175,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dailyAndHourlyWeatherAreaDateText: {
    color: 'rgba(256,256,256,0.8)',
    letterSpacing: 1.2,
  },
  dailyAndHorlyWeatherIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    margin: 0,
  },
  dailyAndHourlyWeatherWeatherArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dailyAndHourlyWeatherDegreeText: {
    color: 'rgba(256,256,256,0.8)',
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 1.2,
    marginLeft: 25,
  },
  dailyAndHourlyWeatherDescription: {
    color: 'rgba(256,256,256,0.8)',
    fontSize: 16,
    letterSpacing: 1.2,
    fontWeight: '300',
  },
  dailyAndHourlyWeatherDown: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  dailyAndHourlyWeatherAnotherInfoArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  dailyAndHourlyWeatherAnotherInfoText: {
    color: 'rgba(256,256,256,0.8)',
    fontSize: 14,
    letterSpacing: 1.3,
  },
  dailyAndHourlyWeatherAnotherInfoIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});

function mapStateToProps(state) {
  return {
    citiesReducer: state.citiesReducer,
    changeCurrentCityWeatherReducer: state.changeCurrentCityWeatherReducer,
  };
}

const mapDispatchToProps = {changeCurrentCityWeather};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
