import { UserActionTypes } from "./user.types";

//reducing all USER data, before adding it to the root
const INITIAL_STATE = {
    currentUser: null
}

//if state is not set it goes back to initial
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;