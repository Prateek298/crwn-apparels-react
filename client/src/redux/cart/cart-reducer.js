import CartActionTypes from './cart-actions-types';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart-utils';

const INITIAL_STATE = {
	hidden: true,
	cartItems: [],
	error: null
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden
			};
		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload)
			};
		case CartActionTypes.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload)
			};
		case CartActionTypes.CLEAR_ITEM:
			return {
				...state,
				cartItems: clearItemFromCart(state.cartItems, action.payload)
			};
		case CartActionTypes.CLEAR_CART:
			return {
				...state,
				cartItems: []
			};
		case CartActionTypes.FETCH_USER_CART_SUCCESS:
			return {
				...state,
				error: null,
				cartItems: action.payload
			};
		case CartActionTypes.FETCH_USER_CART_FAILURE:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default cartReducer;
