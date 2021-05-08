import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';

import { paymentStart } from '../../redux/user/user-actions';

require('dotenv').config();

const StripeCheckoutButton = ({ price }) => {
	const dispatch = useDispatch();
	const priceForStripe = price * 1000;

	const onToken = token => dispatch(paymentStart({ token, priceForStripe }));

	return (
		<StripeCheckout
			label="Pay Now"
			name="CRWN clothing Ltd."
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is Rs.${price * 10}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
		/>
	);
};

export default StripeCheckoutButton;
