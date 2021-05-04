import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import { firestore, addCollectionAndDocuments } from '../../firebaseConfig';
import { clearCart, fetchUserCartFailure, fetchUserCartSuccess } from './cart-actions';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart-utils';
import { selectCurrentUser } from '../user/user-selectors';
import { selectCartItems } from './cart-selectors';

import UserActionTypes from '../user/user-action-types';
import CartActionTypes from './cart-actions-types';

// clears frontend user cart when user signs out

function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserCart);
}

function* clearUserCart() {
	yield put(clearCart());
}

// fetch user's cart from firestore on login

function* fetchUserCartStart() {
	yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchUserCartAsync);
}

function* fetchUserCartAsync() {
	try {
		const currentUser = yield select(selectCurrentUser);
		const cartItemsBeforeSignIn = yield select(selectCartItems);

		// get the firestore cart of the logged-in user
		let userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		let optionalGetCartRuns = 0;

		// create cart for a new user
		if (userCartSnap.empty) {
			yield call(addCollectionAndDocuments, 'carts', [ { cartItems: [], userId: currentUser.id } ]);
			optionalGetCartRuns++;
		}

		// adds the items of a non-signed account to the firestore cart of the user who signs-in
		if (cartItemsBeforeSignIn) {
			for (const cartItem of cartItemsBeforeSignIn) {
				for (let i = 1; i <= cartItem.quantity; i++) yield call(modifyFirebaseCart, cartItem, addItemToCart);
			}
			optionalGetCartRuns++;
		}

		userCartSnap = optionalGetCartRuns ? yield call(getUserCartSnapshot, currentUser.id) : userCartSnap;

		const { cartItems: userCart } = userCartSnap.docs[0].data();

		yield put(fetchUserCartSuccess(userCart));
	} catch (err) {
		yield put(fetchUserCartFailure(err));
	}
}

// adds an item to user's personal cart in firestore

function* onAddItem() {
	yield takeLatest(CartActionTypes.ADD_ITEM, addItemToFirebaseCart);
}

function* addItemToFirebaseCart({ payload: item }) {
	yield call(modifyFirebaseCart, item, addItemToCart);
}

// decreases quantity of an item from user's personal cart in firestore

function* onRemoveItem() {
	yield takeLatest(CartActionTypes.REMOVE_ITEM, removeItemFromFirebaseCart);
}

function* removeItemFromFirebaseCart({ payload: item }) {
	yield call(modifyFirebaseCart, item, removeItemFromCart);
}

// clears the whole item from user's personal cart in firestore

function* onClearItem() {
	yield takeLatest(CartActionTypes.CLEAR_ITEM, clearItemFromFirebaseCart);
}

function* clearItemFromFirebaseCart({ payload: item }) {
	yield call(modifyFirebaseCart, item, clearItemFromCart);
}

// After a successful payment clears both redux as well as firestore cart of the logged-in user

function* onPaymentSuccess() {
	yield takeLatest(CartActionTypes.CLEAR_FIRESTORE_CART, clearBothCarts);
}

function* clearBothCarts() {
	try {
		const currentUser = yield select(selectCurrentUser);

		yield call(clearUserCart);

		const userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		const userCart = userCartSnap.docs[0];
		yield firestore.doc(`carts/${userCart.id}`).set({
			...userCart.data(),
			cartItems: []
		});
	} catch (err) {
		console.log('Error while clearing user firestore cart ', err);
	}
}

function* modifyFirebaseCart(item, modFunc) {
	try {
		// only adding item to firestore if a user is logged in
		const currentUser = yield select(selectCurrentUser);
		if (!currentUser) return;

		const userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		const userCart = userCartSnap.docs[0];
		yield firestore.doc(`carts/${userCart.id}`).set({
			...userCart.data(),
			cartItems: modFunc(userCart.data().cartItems, item)
		});
	} catch (err) {
		console.log('Problem in modifying firestore cart', err);
	}
}

function* getUserCartSnapshot(userId) {
	return yield firestore.collection('carts').where('userId', '==', userId).get();
}

export function* cartSagas() {
	yield all([
		call(onSignOutSuccess),
		call(fetchUserCartStart),
		call(onAddItem),
		call(onRemoveItem),
		call(onClearItem),
		call(onPaymentSuccess)
	]);
}
