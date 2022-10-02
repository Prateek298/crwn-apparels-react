import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import {
	fetchUserCart,
	addItem,
	removeItem,
	clearItem,
	setCartLoading,
	setUserCart,
	reduxClearCart,
	reduxCartAddItem,
	reduxCartRemoveItem,
	reduxCartClearItem,
	setError,
} from './cart-actions';

import { firestore, addCollectionAndDocuments } from '../../firebaseConfig';
import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from './cart-utils';
import { selectCurrentUser } from '../user/user-selectors';
import { selectCartItems, selectCartTotal } from './cart-selectors';

import UserActionTypes from '../user/user-action-types';

const unexpectedErrorMsg = 'Something went wrong';

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
	yield takeLatest(fetchUserCart, fetchUserCartAsync);
}

function* fetchUserCartAsync() {
	try {
		yield put(setCartLoading(true));

		const currentUser = yield select(selectCurrentUser);

		// if a user is logged-in, following doesn't exist
		const cartItemsBeforeSignIn = !currentUser
			? yield select(selectCartItems)
			: null;

		// get the firestore cart of the logged-in user
		let userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		let optionalGetCartRuns = 0;

		// create cart for a new user
		if (userCartSnap.empty) {
			yield call(addCollectionAndDocuments, 'carts', [
				{
					cartItems: [],
					pastOrders: [],
					totalPurchase: 0,
					userId: currentUser.id,
				},
			]);
			optionalGetCartRuns++;
		}

		// adds the items of a non-signed account to the firestore cart of the user who signs-in
		if (cartItemsBeforeSignIn) {
			for (const cartItem of cartItemsBeforeSignIn) {
				for (let i = 1; i <= cartItem.quantity; i++)
					yield call(modifyFirebaseCart, cartItem, addItemToCart);
			}
			optionalGetCartRuns++;
		}

		userCartSnap = optionalGetCartRuns
			? yield call(getUserCartSnapshot, currentUser.id)
			: userCartSnap;

		const { cartItems, pastOrders, totalPurchase } =
			userCartSnap.docs[0].data();

		yield put(setUserCart({ cartItems, pastOrders, totalPurchase }));
	} catch (err) {
		console.log(err.message);
		yield put(setError(unexpectedErrorMsg));
	} finally {
		yield put(setCartLoading(false));
	}
}

// adds an item to user's personal cart in firestore

function* onAddItem() {
	yield takeLatest(addItem, addItemToBothCarts);
}

function* addItemToBothCarts({ payload: item }) {
	try {
		const error = yield call(
			alterCarts,
			item,
			addItemToCart,
			reduxCartAddItem
		);

		if (!error) {
			yield put(fetchUserCart());
		} else {
			console.error('Error while adding item to carts ', error.message);
			yield put(setError(error));
		}
	} catch (err) {
		yield put(setError(unexpectedErrorMsg));
	}
}

// decreases quantity of an item from user's personal cart in firestore

function* onRemoveItem() {
	yield takeLatest(removeItem, removeItemFromBothCarts);
}

function* removeItemFromBothCarts({ payload: item }) {
	try {
		const error = yield call(
			alterCarts,
			item,
			removeItemFromCart,
			reduxCartRemoveItem
		);

		if (!error) {
			yield put(fetchUserCart());
		} else {
			console.log('Error while removing from cart', error.message);
			yield put(setError(error));
		}
	} catch (err) {
		yield put(setError(unexpectedErrorMsg));
	}
}

// clears the whole item from user's personal cart in firestore

function* onClearItem() {
	yield takeLatest(clearItem, clearItemFromBothCarts);
}

function* clearItemFromBothCarts({ payload: item }) {
	try {
		const error = yield call(
			alterCarts,
			item,
			clearItemFromCart,
			reduxCartClearItem
		);

		if (!error) {
			yield put(fetchUserCart());
		} else {
			console.error(
				'Error while clearing an item from cart',
				error.message
			);
			yield put(setError(error));
		}
	} catch (err) {
		yield put(setError(unexpectedErrorMsg));
	}
}

// After a successful payment made by the logged-in user

function* onPaymentSuccess() {
	yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, afterPaymentSuccess);
}

function* afterPaymentSuccess() {
	try {
		const currentUser = yield select(selectCurrentUser);

		const userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		const userCart = userCartSnap.docs[0];

		yield call(modifyCartsAfterPayment, userCart);
		yield put(fetchUserCart());
	} catch (err) {
		yield put(setError(err));
	}
}

function* modifyCartsAfterPayment(userCart) {
	try {
		const total = yield select(selectCartTotal);

		//clearing redux cart
		yield call(clearReduxCart);

		// clearing cartItems in firestore and updating total amount spent by the user
		const userCartData = userCart.data();
		yield firestore.doc(`carts/${userCart.id}`).set({
			...userCartData,
			totalPurchase: userCartData.totalPurchase + total,
			pastOrders: [...userCartData.cartItems, ...userCartData.pastOrders],
			cartItems: [],
		});
	} catch (err) {
		console.error('Error while modifying user cart(s) ', err.message);
	}
}

// Multi-use functions

function* alterCarts(item, modFunc, reduxModFunc) {
	try {
		const currentUser = yield select(selectCurrentUser);

		// if user is signed in, update db cart only
		if (currentUser) {
			const error = yield call(modifyFirebaseCart, item, modFunc);

			if (error) {
				yield put(setError(error));
			}
		} else {
			yield put(reduxModFunc(item));
		}
	} catch (err) {
		return err;
	}
}

function* modifyFirebaseCart(item, modFunc) {
	try {
		// only adding item to firestore if a user is logged in
		const currentUser = yield select(selectCurrentUser);
		if (!currentUser) return;

		yield put(setCartLoading(true));
		const userCartSnap = yield call(getUserCartSnapshot, currentUser.id);
		const userCart = userCartSnap.docs[0];
		yield firestore.doc(`carts/${userCart.id}`).set({
			...userCart.data(),
			cartItems: modFunc(userCart.data().cartItems, item),
		});
	} catch (err) {
		console.error('Problem in modifying firestore cart', err.message);
		return err;
	} finally {
		yield put(setCartLoading(true));
	}
}

function* getUserCartSnapshot(userId) {
	return yield firestore
		.collection('carts')
		.where('userId', '==', userId)
		.get();
}

export function* cartSagas() {
	yield all([
		call(onSignOutSuccess),
		call(fetchUserCartStart),
		call(onAddItem),
		call(onRemoveItem),
		call(onClearItem),
		call(onPaymentSuccess),
	]);
}
