import { takeLatest, call, put } from "redux-saga/effects";

import { firestore, convertCollectionShapshotToMap } from "../../firebase/firebase.utilis";

import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
    try{
        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();

        const collectionsMap = yield call(convertCollectionShapshotToMap, snapshot);

        //put is the saga equivalent to "dispatch"
        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    //yeild pauses function after each call. Then finishes after last yeild
    //takeEvery is a non-blocking code. Code doesn't stop while the calls take effect. This way code works while the collections are fetching. You can also CANCEL functions coming out of the saga. Sagas work like async code, but technically are not, since they are encapsulated in the reducers
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync
    );
}