import { Mutation } from '@apollo/react-components';
import React from 'react';

import { ADD_ITEM_TO_CART } from '../../graphql/cart/cart-mutations';

import CollectionItem from './collectionItem-comp';

const CollectionItemContainer = props => (
	<Mutation mutation={ADD_ITEM_TO_CART}>
		{addItemToCart => <CollectionItem {...props} addItem={item => addItemToCart({ variables: { item } })} />}
	</Mutation>
);

export default CollectionItemContainer;
