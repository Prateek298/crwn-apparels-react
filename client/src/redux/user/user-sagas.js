import { takeLatest, call, put, all } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebaseConfig';

import UserActionTypes from './user-action-types';
import {
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure,
	paymentFailure,
	paymentSuccess
} from './user-actions';
import { reduxClearCart } from '../cart/cart-actions';

import axios from 'axios';

// When new user signs up with email

// 2nd argument receives the action from respective reducer
function* onEmailSignUpStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START, createNewUser);
}

function* createNewUser({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield call(createUserProfileDocument, user, { displayName });
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		yield put(signInFailure(err));
	}
}

// when user signs in with google

function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		yield put(signInFailure(err));
	}
}

// when user signs in with email

function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		yield put(signInFailure(err));
	}
}

// to check for existing user when session restarts

function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield put(reduxClearCart());
		yield getSnapshotFromUserAuth(userAuth);
	} catch (err) {
		yield put(signInFailure(err));
	}
}

// when user signs out

function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* signOut() {
	try {
		// sign out from firebase
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (err) {
		yield put(signOutFailure(err));
	}
}

// to get snapshot from firestore

function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (err) {
		yield signInFailure(err);
	}
}

// When user makes a payment

function* onPaymentStart() {
	yield takeLatest(UserActionTypes.PAYMENT_START, sendPaymentRequest);
}

function* sendPaymentRequest({ payload: { token, priceForStripe } }) {
	try {
		yield axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		});
		yield put(paymentSuccess());
		alert('Payment Successful');
	} catch (err) {
		console.log('Payment error: ', err);
		yield put(paymentFailure(err));
	}
}

export function* userSagas() {
	yield all([
		call(onEmailSignUpStart),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onPaymentStart)
	]);
}

// export function* waitFor(selector) {
// 	if (yield select(selector)) return;

// 	while (true) {
// 		yield take('*');
// 		if (yield select(selector)) return;
// 	}
// }
