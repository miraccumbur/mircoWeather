// Burada bütün reducerlarımızı bir araya topluyoruz.
// import {combineReducers} from 'redux';
// import counterReducer from "./xReducer";

// const reducers = combineReducers({
//     counterReducer
// });

// export default reducers;

import {combineReducers} from 'redux';
import changeLoggedUserReducer from './changeLoggedUserReducer';
import citiesReducer from './citiesReducer';
import changeCurrentCityWeatherReducer from './changeCurrentCityWeatherReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfigForChangeLoggedUserReducer = {
  key: 'root',
  storage: AsyncStorage,
};
const persistConfigForChangeCurrentCityWeatherReducer = {
  key: 'root2',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  changeLoggedUserReducer: persistReducer(
    persistConfigForChangeLoggedUserReducer,
    changeLoggedUserReducer,
  ),
  citiesReducer: citiesReducer,
  changeCurrentCityWeatherReducer: persistReducer(
    persistConfigForChangeCurrentCityWeatherReducer,
    changeCurrentCityWeatherReducer,
  ),
});

export default reducers;
