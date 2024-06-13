// Burada aksiyonlarımızı oluşturuyoruz.
// import * as actionTypes from "../actions/actionsType";
// import initialState from './initialState'

// const counterReducer=(state=initialState.xCounter,action)=>{
//     let newState;
//     switch (action.type) {
//         case actionTypes.INCREASE_COUNTER:
//             return(newState = state+action.payload);
//         case actionTypes.DECREASE_COUNTER:
//             return(newState = state-action.payload);
//         case actionTypes.INCREASE_BY_TWO_COUNTER:
//             return(newState = state+action.payload);
//         default:
//             return state;
//     }
// };

// export default counterReducer;

import * as actionTypes from '../actions/actionsType';
import {loggedUser} from './initialState';

const changeLoggedUserReducer = (state = loggedUser, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGGED_USER:
      return action.payload;
    default:
      return state;
  }
};

export default changeLoggedUserReducer;
