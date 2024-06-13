import * as actionTypes from "./actionsType";

export const changeWeatherPageBackground = (background)=>({
    type:actionTypes.CHANGE_WEATHER_PAGE_BACKGROUND,
    payload:background
})