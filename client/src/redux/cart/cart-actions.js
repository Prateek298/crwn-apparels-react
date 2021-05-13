import CartActionTypes from './cart-actions-types';

export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item
});

export const reduxCartAddItem = item => ({
	type: CartActionTypes.REDUX_CART_ADD_ITEM,
	payload: item
});

export const removeItem = item => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item
});

export const reduxCartRemoveItem = item => ({
	type: CartActionTypes.REDUX_CART_REMOVE_ITEM,
	payload: item
});

export const clearItem = item => ({
	type: CartActionTypes.CLEAR_ITEM,
	payload: item
});

export const reduxCartClearItem = item => ({
	type: CartActionTypes.REDUX_CART_CLEAR_ITEM,
	payload: item
});

export const reduxClearCart = () => ({
	type: CartActionTypes.REDUX_CLEAR_CART
});

export const fetchUserCartSuccess = userCart => ({
	type: CartActionTypes.FETCH_USER_CART_SUCCESS,
	payload: userCart
});

export const fetchUserCartFailure = err => ({
	type: CartActionTypes.FETCH_USER_CART_FAILURE,
	payload: err
});
