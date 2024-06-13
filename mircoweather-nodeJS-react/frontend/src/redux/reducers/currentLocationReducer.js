import * as actionTypes from "../actions/actionsType";
import initialState from './initialState'

const currentLocationReducer=(state=initialState.currentLocation,action)=>{
    let newState;
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_LOCATION:
            newState = action.payload
            return newState;
        default:
            return state;
    }
};

export default currentLocationReducer;