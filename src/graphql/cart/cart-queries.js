import { gql } from 'apollo-boost';

// @client specifies apollo to get data from client-side
export const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

export const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

export const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

export const GET_CART_TOTAL = gql`
	{
		cartTotal @client
	}
`;
