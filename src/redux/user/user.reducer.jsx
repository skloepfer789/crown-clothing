import UserActionTypes from "./user.types";

//reducing all USER data, before adding it to the root
const INITIAL_STATE = {
    currentUser: null,
    error: null
}

//if state is not set it goes back to initial
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                error: null
            };
        
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state, 
                currentUser: null,
                error: null
            };

        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;