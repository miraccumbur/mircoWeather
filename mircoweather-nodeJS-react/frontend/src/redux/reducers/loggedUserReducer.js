import * as actionTypes from "../actions/actionsType";
import initialState from './initialState'

const loggedUserReducer=(state=initialState.loggedUser,action)=>{
    let newState;
    switch (action.type) {
        case actionTypes.CHANGE_LOGGED_USER:
            newState = action.payload
            return newState;
        default:
            return state;
    }
};

export default loggedUserReducer;