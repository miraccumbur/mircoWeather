import * as actionTypes from './actionsType';
export const changeCurrentCityWeather = weatherInfo => ({
  type: actionTypes.CHANGE_CURRENT_CITY_WEATHER,
  payload: weatherInfo,
});
