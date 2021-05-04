import React from 'react';
import { useSelector } from 'react-redux';

import './checkoutPage.scss';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart-selectors';

import CheckoutItem from '../../components/checkoutItem/checkoutItem-comp';
import StripeCheckoutButton from '../../components/stripeButton/stripeButton-comp';

const CheckoutPage = () => {
	const cartItems = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);
	return (
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
				Card no. : 4242 4242 4242 4242
				<br />
				Exp. date: Any future date - CVC: any 3 digits
			</div>
			<StripeCheckoutButton price={total} />
		</div>
	);
};

export default CheckoutPage;
