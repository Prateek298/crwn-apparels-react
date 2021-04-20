import React from 'react';
import { Query, Mutation } from '@apollo/react-components';

import { GET_ITEM_COUNT } from '../../graphql/cart/cart-queries';
import { TOGGLE_CART_HIDDEN } from '../../graphql/cart/cart-mutations';

import CartIcon from './cartIcon-comp';

const CartIconContainer = () => (
	<Query query={GET_ITEM_COUNT}>
		{({ data: { itemCount } }) => (
			<Mutation mutation={TOGGLE_CART_HIDDEN}>
				{toggleCartHidden => <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartHidden} />}
			</Mutation>
		)}
	</Query>
);

export default CartIconContainer;
