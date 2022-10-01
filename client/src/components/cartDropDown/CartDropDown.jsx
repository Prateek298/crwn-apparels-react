import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './CartDropDown.scss';

import { toggleCartHidden } from 'redux/cart/cart-actions';
import { selectCartItems } from 'redux/cart/cart-selectors';

import CartItem from './CartItem';
import CustomButton from '../CustomButton';

const CartDropDown = () => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="cart-dropdown">
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
				) : (
					<span className="empty-msg">Cart is empty</span>
				)}
			</div>
			<CustomButton
				onClick={() => {
					navigate('/checkout');
					dispatch(toggleCartHidden());
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

export default CartDropDown;
