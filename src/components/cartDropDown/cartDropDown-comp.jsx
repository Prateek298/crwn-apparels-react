import React from 'react';
import { withRouter } from 'react-router-dom';

import './cartDropDown.scss';

import CartItem from '../cartItem/cartItem-comp';
import CustomButton from '../customButton/customButton-comp';

const CartDropDown = ({ cartItems, history, toggleCartHidden }) => (
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
				toggleCartHidden();
			}}
		>
			GO TO CHECKOUT
		</CustomButton>
	</div>
);

export default withRouter(CartDropDown);
