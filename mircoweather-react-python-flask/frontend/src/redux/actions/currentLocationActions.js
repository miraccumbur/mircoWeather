import * as actionTypes from "./actionsType";

export const changeCurrentLocation = (currentLocation)=>({
    type:actionTypes.CHANGE_CURRENT_LOCATION,
    payload:currentLocation
})