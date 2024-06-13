import * as actionTypes from "./actionsType";

export const changeLoggedUser = (user)=>({
    type:actionTypes.CHANGE_LOGGED_USER,
    payload:user
})