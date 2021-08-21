import {all, call} from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

//makes it so all sagas work together, much like a root reducer.
//the 'all' call makes all sagas run concurrently. VS if they all were listed as yield options, they would wait on each function to finish before starting the next.
export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas)
    ]);
}