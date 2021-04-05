import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51IbpeeSD3J25iOCQKzFJbEnoMH0KPHt1CXeRnOvD2mZk9QI05G3YR0tly5gdbRx8zt65Xw8l1AmahmysLjXoIOsq002CDPBfHt';

	const onToken = token => {
		alert('Payment successful');
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="CRWN clothing Ltd."
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
