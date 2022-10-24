import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from '../../firebaseConfig';

import {
	emailSignUp,
	googleSignIn,
	emailSignIn,
	signInSuccess,
	signOut,
	checkUserSession,
	doPayment,
	paymentSuccess,
	setCurrentUser,
	setError,
} from './user-actions';
import { reduxClearCart } from '../cart/cart-actions';

import axios from 'axios';

const unexpectedErrorMsg = 'Some error occured';

// When new user signs up with email

function* onEmailSignUp() {
	yield takeLatest(emailSignUp, createNewUser);
}

function* createNewUser({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield call(createUserProfileDocument, user, { displayName });
		yield call(getSnapshotFromUserAuth, user);
	} catch (err) {
		console.log('Error while creating new user \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

// when user signs in with google

function* onGoogleSignIn() {
	yield takeLatest(googleSignIn, signInWithGoogle);
}

function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield call(getSnapshotFromUserAuth, user);
	} catch (err) {
		console.log('Error signing in with google \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

// when user signs in with email

function* onEmailSignIn() {
	yield takeLatest(emailSignIn, signInWithEmail);
}

function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield call(getSnapshotFromUserAuth, user);
	} catch (err) {
		console.log('Error signing in with email \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

// to check for existing user when session restarts

function* onCheckUserSession() {
	yield takeLatest(checkUserSession, isUserAuthenticated);
}

function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield put(reduxClearCart());
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (err) {
		console.log('Error checking user session \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

// when user signs out

function* onSignOut() {
	yield takeLatest(signOut, signOutUser);
}

function* signOutUser() {
	try {
		// sign out from firebase
		yield auth.signOut();
		yield put(reduxClearCart());
		yield put(setCurrentUser(null));
	} catch (err) {
		console.log('Error while user signout \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

// to get snapshot from firestore

function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const userSnapshot = yield userRef.get();
		yield put(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }));
		yield put(signInSuccess());
	} catch (err) {
		console.log('Error getting user snapshot \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

// When user makes a payment

function* onPayment() {
	yield takeLatest(doPayment, sendPaymentRequest);
}

function* sendPaymentRequest({ payload: { token, priceForStripe } }) {
	try {
		yield axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token,
			},
		});
		yield put(paymentSuccess());
		alert('Payment Successful');
	} catch (err) {
		console.log('Payment error: \n', err);
		yield put(setError(unexpectedErrorMsg));
	}
}

export function* userSagas() {
	yield all([
		call(onEmailSignUp),
		call(onGoogleSignIn),
		call(onEmailSignIn),
		call(onCheckUserSession),
		call(onSignOut),
		call(onPayment),
	]);
}

// export function* waitFor(selector) {
// 	if (yield select(selector)) return;

// 	while (true) {
// 		yield take('*');
// 		if (yield select(selector)) return;
// 	}
// }
