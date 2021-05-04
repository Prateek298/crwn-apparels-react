import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './cartDropDown.scss';

import { toggleCartHidden } from '../../redux/cart/cart-actions';
import { selectCartItems } from '../../redux/cart/cart-selectors';

import CartItem from '../cartItem/cartItem-comp';
import CustomButton from '../customButton/customButton-comp';

const CartDropDown = () => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const history = useHistory();

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
					history.push('/checkout');
					dispatch(toggleCartHidden());
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

export default CartDropDown;
