import { gql } from 'apollo-boost';

export const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHidden {
		toggleCartHidden @client
	}
`;

export const ADD_ITEM_TO_CART = gql`
	mutation AddItemToCart($item: Item!) {
		addItemToCart(item: $item) @client
	}
`;

export const REMOVE_ITEM_FROM_CART = gql`
	mutation RemoveItemFromCart($item: Item!) {
		removeItemFromCart(item: $item) @client
	}
`;

export const CLEAR_ITEM_FROM_CART = gql`
	mutation ClearItemFromCart($item: Item!) {
		clearItemFromCart(item: $item) @client
	}
`;
