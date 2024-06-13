// Burada aksiyonlarımızı tanımlıyoruz.
// import * as actionTypes from "./actionsType";
// export const increaseCounter = ()=>({
//     type:actionTypes.INCREASE_COUNTER,
//     payload:1
// })

import * as actionTypes from './actionsType';
export const changeLoggedUser = userInfo => ({
  type: actionTypes.CHANGE_LOGGED_USER,
  payload: userInfo,
});
