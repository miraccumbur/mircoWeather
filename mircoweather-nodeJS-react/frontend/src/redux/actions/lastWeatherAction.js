import * as actionTypes from "./actionsType";

export const changeLastWeather = (lastWeather)=>({
    type:actionTypes.CHANGE_LAST_WEATHER,
    payload:lastWeather
})