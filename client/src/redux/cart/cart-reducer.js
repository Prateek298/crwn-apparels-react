import CartActionTypes from './cart-actions-types';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart-utils';

const INITIAL_STATE = {
	hidden: true,
	cartItems: [],
	pastOrders: [],
	totalPurchase: null,
	error: null
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden
			};
		case CartActionTypes.REDUX_CART_ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload)
			};
		case CartActionTypes.REDUX_CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload)
			};
		case CartActionTypes.REDUX_CART_CLEAR_ITEM:
			return {
				...state,
				cartItems: clearItemFromCart(state.cartItems, action.payload)
			};
		case CartActionTypes.REDUX_CLEAR_CART:
			return {
				...state,
				cartItems: []
			};
		case CartActionTypes.FETCH_USER_CART_SUCCESS:
			const { cartItems, pastOrders, totalPurchase } = action.payload;
			return {
				...state,
				error: null,
				cartItems,
				pastOrders,
				totalPurchase
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
