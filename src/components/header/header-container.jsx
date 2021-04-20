import React from 'react';
import { Query } from '@apollo/react-components';

import { GET_CART_HIDDEN } from '../../graphql/cart/cart-queries';

import Header from './header-comp';

const HeaderContainer = () => (
	<Query query={GET_CART_HIDDEN}>{({ data: { cartHidden } }) => <Header hidden={cartHidden} />}</Query>
);

export default HeaderContainer;
