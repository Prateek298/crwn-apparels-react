import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import CartActionTypes from '../../redux/cart/cart-actions-types';

require('dotenv').config();

const StripeCheckoutButton = ({ price }) => {
	const dispatch = useDispatch();
	const priceForStripe = price * 1000;

	const onToken = token => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		})
			.then(res => {
				dispatch({ type: CartActionTypes.CLEAR_FIRESTORE_CART });
				alert('Payment successful');
			})
			.catch(err => console.log('Payment error: ', err));
	};

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
