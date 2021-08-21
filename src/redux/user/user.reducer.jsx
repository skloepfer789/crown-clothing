import UserActionTypes from "./user.types";

//reducing all USER data, before adding it to the root
const INITIAL_STATE = {
    currentUser: null,
    error: null
}

//if state is not set it goes back to initial
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;