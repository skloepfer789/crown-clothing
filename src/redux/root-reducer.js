//represents all the state of App
import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});