import { createStore, applyMiddleware } from "redux";
//install redux persist "yarn add redux-persist" for local and session storage
import { persistStore } from "redux-persist";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { fetchCollectionsStart } from "./shop/shop.sagas";

import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

//set up our middleware
const middlewares = [sagaMiddleware];

//only use middleware in dev. enviorment, not deploy
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);

export default {store, persistor};