import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import { firestore, addCollectionAndDocuments } from '../../firebaseConfig';
import {
	reduxClearCart,
	fetchUserCartFailure,
	fetchUserCartSuccess,
	reduxCartAddItem,
	reduxCartRemoveItem,
	reduxCartClearItem
} from './cart-actions';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart-utils';
import { selectCurrentUser } from '../user/user-selectors';
import { selectCartItems, selectCartTotal } from './cart-selectors';

import UserActionTypes from '../user/user-action-types';
import CartActionTypes from './cart-actions-types';

// clears frontend user cart when user signs out

function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearReduxCart);
}

function* clearReduxCart() {
	yield put(reduxClearCart());
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
			yield call(addCollectionAndDocuments, 'carts', [
				{ cartItems: [], totalPurchase: 0, userId: currentUser.id }
			]);
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
	yield takeLatest(CartActionTypes.ADD_ITEM, addItemToBothCarts);
}

function* addItemToBothCarts({ payload: item }) {
	try {
		const error = yield call(alterCarts, item, addItemToCart, reduxCartAddItem);
		if (error) console.error('Error while adding item to carts ', error.message);
	} catch (err) {
		console.error(err.message);
	}
}

// decreases quantity of an item from user's personal cart in firestore

function* onRemoveItem() {
	yield takeLatest(CartActionTypes.REMOVE_ITEM, removeItemFromBothCarts);
}

function* removeItemFromBothCarts({ payload: item }) {
	try {
		const error = yield call(alterCarts, item, removeItemFromCart, reduxCartRemoveItem);
		if (error) console.error('Error while removing from cart', error.message);
	} catch (err) {
		console.error(err.message);
	}
}

// clears the whole item from user's personal cart in firestore

function* onClearItem() {
	yield takeLatest(CartActionTypes.CLEAR_ITEM, clearItemFromBothCarts);
}

function* clearItemFromBothCarts({ payload: item }) {
	try {
		const error = yield call(alterCarts, item, clearItemFromCart, reduxCartClearItem);
		if (error) console.error('Error while clearing an item from cart', error.message);
	} catch (err) {
		console.error(err.message);
	}
}

// After a successful payment made by the logged-in user

function* onPaymentSuccess() {
	yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, modifyCartsAfterPayment);
}

function* modifyCartsAfterPayment() {
	try {
		const currentUser = yield select(selectCurrentUser);
		const total = yield select(selectCartTotal);

		//clearing redux cart
		yield call(clearReduxCart);

		const userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		const userCart = userCartSnap.docs[0];
		const totalPurchase = userCart.data().totalPurchase + total;

		// clearing cartItems in firestore and updating total amount spent by the user
		yield firestore.doc(`carts/${userCart.id}`).set({
			...userCart.data(),
			totalPurchase,
			cartItems: []
		});
	} catch (err) {
		console.error('Error while clearing user cart(s) ', err.message);
	}
}

// Multi-use functions

function* alterCarts(item, modFunc, reduxModFunc) {
	try {
		const currentUser = yield select(selectCurrentUser);

		if (currentUser) {
			yield call(modifyFirebaseCart, item, modFunc);
		}
		yield put(reduxModFunc(item));
	} catch (err) {
		return err;
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
		console.error('Problem in modifying firestore cart', err.message);
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
