import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { SignInSuccess, SignInFailure, signOutFailure, signOutSuccess, signUpSuccess, signUpFailure } from "./user.actions";

import { 
    auth, 
    googleProvider, 
    createUserProfileDocument, 
    getCurrentUser,
} from "../../firebase/firebase.utilis";

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(
            SignInSuccess({id: userSnapshot.id, ...userSnapshot.data()})
        );
    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

//create new firebase util to leverage existing code to check user.
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(SignInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({payload: {email, password, displayName}}) {
    try {

        const {user} = yield auth.createUserWithEmailAndPassword( email, password );

        yield put(signUpSuccess({user, additionalData: {displayName} }));

    } catch (error) {
        put(signUpFailure(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
};