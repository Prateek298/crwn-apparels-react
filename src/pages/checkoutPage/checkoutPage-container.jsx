import React from 'react';
import { Query } from 'react-apollo';

import { GET_CART_ITEMS, GET_CART_TOTAL } from '../../graphql/cart/cart-queries';

import CheckoutPage from './checkoutPage-comp';

const CheckoutPageContainer = () => (
	<Query query={GET_CART_ITEMS}>
		{({ data: { cartItems } }) => (
			<Query query={GET_CART_TOTAL}>
				{({ data: { cartTotal } }) => <CheckoutPage cartItems={cartItems} total={cartTotal} />}
			</Query>
		)}
	</Query>
);

export default CheckoutPageContainer;
