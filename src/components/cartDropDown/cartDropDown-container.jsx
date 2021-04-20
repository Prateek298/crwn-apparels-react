import React from 'react';
import { Mutation, Query } from '@apollo/react-components';

import { GET_CART_ITEMS } from '../../graphql/cart/cart-queries';
import { TOGGLE_CART_HIDDEN } from '../../graphql/cart/cart-mutations';

import CartDropDown from './cartDropDown-comp';

const CartDropDownContainer = () => (
	<Mutation mutation={TOGGLE_CART_HIDDEN}>
		{toggleCartHidden => (
			<Query query={GET_CART_ITEMS}>
				{({ data: { cartItems } }) => (
					<CartDropDown cartItems={cartItems} toggleCartHidden={toggleCartHidden} />
				)}
			</Query>
		)}
	</Mutation>
);

export default CartDropDownContainer;
