import * as actionTypes from "../actions/actionsType";
import initialState from './initialState'

const weatherPageBackgroundReducer=(state=initialState.weatherPageBackground,action)=>{
    let newState;
    switch (action.type) {
        case actionTypes.CHANGE_WEATHER_PAGE_BACKGROUND:
            newState = action.payload
            return newState;
        default:
            return state;
    }
};

export default weatherPageBackgroundReducer;