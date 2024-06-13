import * as actionTypes from '../actions/actionsType';
import {changeCurrentCityWeather} from './initialState';

const changeCurrentCityWeatherReducer = (
  state = changeCurrentCityWeather,
  action,
) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_CITY_WEATHER:
      return action.payload;
    default:
      return state;
  }
};

export default changeCurrentCityWeatherReducer;
