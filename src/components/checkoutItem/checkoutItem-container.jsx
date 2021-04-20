import React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_ITEM_FROM_CART } from '../../graphql/cart/cart-mutations';

import CheckoutItem from './checkoutItem-comp';

const CheckoutItemContainer = props => (
	<Mutation mutation={ADD_ITEM_TO_CART}>
		{addItemToCart => (
			<Mutation mutation={REMOVE_ITEM_FROM_CART}>
				{removeItemFromCart => (
					<Mutation mutation={CLEAR_ITEM_FROM_CART}>
						{clearItemFromCart => (
							<CheckoutItem
								{...props}
								addItem={item => addItemToCart({ variables: { item } })}
								removeItem={item => removeItemFromCart({ variables: { item } })}
								clearItem={item => clearItemFromCart({ variables: { item } })}
							/>
						)}
					</Mutation>
				)}
			</Mutation>
		)}
	</Mutation>
);

export default CheckoutItemContainer;
