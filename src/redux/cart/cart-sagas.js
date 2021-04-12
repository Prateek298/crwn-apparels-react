import { takeLatest, call, put, all } from 'redux-saga/effects';

import { clearCart } from './cart-actions';
import UserActionTypes from '../user/user-action-types';

function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserCart);
}

function* clearUserCart() {
	yield put(clearCart());
}

export function* cartSagas() {
	yield all([ call(onSignOutSuccess) ]);
}
