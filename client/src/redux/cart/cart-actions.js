import CartActionTypes from './cart-actions-types';

export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item
});

export const removeItem = item => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item
});

export const clearItem = item => ({
	type: CartActionTypes.CLEAR_ITEM,
	payload: item
});

export const clearCart = () => ({
	type: CartActionTypes.CLEAR_CART
});

export const fetchUserCartSuccess = userCart => ({
	type: CartActionTypes.FETCH_USER_CART_SUCCESS,
	payload: userCart
});

export const fetchUserCartFailure = err => ({
	type: CartActionTypes.FETCH_USER_CART_FAILURE,
	payload: err
});
