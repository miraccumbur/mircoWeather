import * as actionTypes from "../actions/actionsType";
import initialState from './initialState'

const lastWeatherReducer=(state=initialState.lastWeather,action)=>{
    let newState;
    switch (action.type) {
        case actionTypes.CHANGE_LAST_WEATHER:
            newState = action.payload
            return newState;
        default:
            return state;
    }
};

export default lastWeatherReducer;