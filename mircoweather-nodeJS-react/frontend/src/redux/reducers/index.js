// Burada bütün reducerlarımızı bir araya topluyoruz.
import{combineReducers} from "redux";
// import counterReducer from "./xReducer"; 
import loggedUserReducer from "./loggedUserReducer"; 
import citiesReducer from "./citiesReducer"; 
import currentLocationReducer from "./currentLocationReducer"; 
import lastWeatherReducer from "./lastWeatherReducer"; 
import weatherPageBackgroundReducer from "./weatherPageBackgroundReducer"; 

// const reducers = combineReducers({
//     counterReducer
// });

// export default reducers;

const reducers = combineReducers({
    loggedUserReducer,
    citiesReducer,
    currentLocationReducer,
    lastWeatherReducer,
    weatherPageBackgroundReducer
});

export default reducers;