//represents all the state of App
import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
//storage is LocalStorage. Can also import sessionStorage in a different folder
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    //whitelist is array containing stringNames of anything you're wanting to store. user is handled by firebase. can throw in new keys after ['cart', 'nextItem']
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);