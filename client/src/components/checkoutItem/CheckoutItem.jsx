import React from 'react';
import { useDispatch } from 'react-redux';

import './CheckoutItem.scss';

import { clearItem, addItem, removeItem } from 'redux/cart/cart-actions';

const CheckoutItem = ({ cartItem, asPastOrder = false }) => {
	const dispatch = useDispatch();
	const { imageUrl, name, quantity, price } = cartItem;

	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item" />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				{!asPastOrder && (
					<div onClick={() => dispatch(removeItem(cartItem))} className="arrow">
						&#10094;
					</div>
				)}
				<span className="value">{quantity}</span>
				{!asPastOrder && (
					<div onClick={() => dispatch(addItem(cartItem))} className="arrow">
						&#10095;
					</div>
				)}
			</span>
			<span className="price">{price}</span>
			{!asPastOrder && (
				<div onClick={() => dispatch(clearItem(cartItem))} className="remove-button">
					&#10005;
				</div>
			)}
		</div>
	);
};

export default CheckoutItem;
