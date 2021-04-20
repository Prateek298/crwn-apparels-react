import React from 'react';

import './checkoutPage.scss';

import { default as CheckoutItem } from '../../components/checkoutItem/checkoutItem-container';
import StripeCheckoutButton from '../../components/stripeButton/stripeButton-comp';

const CheckoutPage = ({ cartItems, total }) => (
	<div className="checkout-page">
		<div className="checkout-header">
			<div className="header-block">
				<span>Product</span>
			</div>
			<div className="header-block">
				<span>Description</span>
			</div>
			<div className="header-block">
				<span>Quantity</span>
			</div>
			<div className="header-block">
				<span>Price</span>
			</div>
			<div className="header-block">
				<span>Remove</span>
			</div>
		</div>
		{cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)}
		<div className="total">
			<span>Total: ${total}</span>
		</div>
		<div className="warning-msg">
			** Use this info for test payments **
			<br />
			Card no. : 4000 0035 6000 0008
			<br />
			Exp. date: Any future date - CVC: any 3 digits
		</div>
		<StripeCheckoutButton price={total} />
	</div>
);

export default CheckoutPage;
