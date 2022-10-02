import { createSlice } from '@reduxjs/toolkit';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart-utils';

const INITIAL_STATE = {
	hidden: true,
	loading: false,
	cartItems: [],
	pastOrders: [],
	totalPurchase: null,
	error: null
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: INITIAL_STATE,
	reducers: {
		toggleCartHidden: state => {
			state.hidden = !state.hidden;
		},
		setCartLoading: (state, { payload }) => {
			state.loading = payload;
		},
		reduxCartAddItem: (state, { payload }) => {
			state.cartItems = addItemToCart(state.cartItems, payload);
		},
		reduxCartRemoveItem: (state, { payload }) => {
			state.cartItems = removeItemFromCart(state.cartItems, payload);
		},
		reduxCartClearItem: (state, { payload }) => {
			state.cartItems = clearItemFromCart(state.cartItems, payload);
		},
		reduxClearCart: state => {
			state.cartItems = [];
		},
		setUserCart: (state, { payload }) => {
			const { cartItems, pastOrders, totalPurchase } = payload;

			state.cartItems = cartItems;
			state.pastOrders = pastOrders;
			state.totalPurchase = totalPurchase;
		},
		setError: (state, { payload }) => {
			state.error = payload;
		}
	}
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
