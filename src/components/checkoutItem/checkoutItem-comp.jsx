import React from 'react';

import './checkoutItem.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { imageUrl, name, quantity, price } = cartItem;
	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item" />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div onClick={() => removeItem(cartItem)} className="arrow">
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div onClick={() => addItem(cartItem)} className="arrow">
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<div onClick={() => clearItem(cartItem)} className="remove-button">
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
