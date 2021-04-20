import { gql } from 'apollo-boost';

import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
	getCartItemsCount,
	getCartTotal
} from './cart/cart-utils';
import { GET_CART_HIDDEN, GET_CART_ITEMS, GET_ITEM_COUNT, GET_CART_TOTAL } from './cart/cart-queries';

export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}

	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
		RemoveItemFromCart(item: Item!): [Item]!
		ClearItemFromCart(item: Item!): [Item]!
	}
`;

export const resolvers = {
	Mutation: {
		toggleCartHidden: (_root, _args, { cache }) => {
			const { cartHidden } = cache.readQuery({
				query: GET_CART_HIDDEN
			});

			cache.writeQuery({
				query: GET_CART_HIDDEN,
				data: { cartHidden: !cartHidden }
			});

			return !cartHidden;
		},

		addItemToCart: (_root, { item }, { cache }) => modifyCart(item, cache, addItemToCart),
		removeItemFromCart: (_root, { item }, { cache }) => modifyCart(item, cache, removeItemFromCart),
		clearItemFromCart: (_root, { item }, { cache }) => modifyCart(item, cache, clearItemFromCart)
	}
};

function modifyCart(item, cache, modFunc) {
	const { cartItems } = cache.readQuery({
		query: GET_CART_ITEMS
	});

	const newCartItems = modFunc(cartItems, item);

	cache.writeQuery({
		query: GET_ITEM_COUNT,
		data: { itemCount: getCartItemsCount(newCartItems) }
	});

	cache.writeQuery({
		query: GET_CART_TOTAL,
		data: { cartTotal: getCartTotal(newCartItems) }
	});

	cache.writeQuery({
		query: GET_CART_ITEMS,
		data: { cartItems: newCartItems }
	});

	return newCartItems;
}
