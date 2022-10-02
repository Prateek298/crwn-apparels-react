import { createAction } from '@reduxjs/toolkit';

import { cartActions } from './cart-slice';

export const fetchUserCart = createAction('FETCH_USER_CART');
export const addItem = createAction('ADD_ITEM');
export const removeItem = createAction('REMOVE_ITEM');
export const clearItem = createAction('CLEAR_ITEM');

export const {
	toggleCartHidden,
	setCartLoading,
	reduxCartAddItem,
	reduxCartRemoveItem,
	reduxCartClearItem,
	reduxClearCart,
	setUserCart,
	setError,
} = cartActions;
