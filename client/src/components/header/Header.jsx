import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Header.scss';

import { selectCurrentUser } from 'redux/user/user-selectors';
import { selectCartHidden } from 'redux/cart/cart-selectors';
import { signOutStart } from 'redux/user/user-actions';

import { ReactComponent as Logo } from 'assets/crown.svg';
import CartIcon from '../CartIcon';
import CartDropDown from '../CartDropDown';

require('dotenv').config();

const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
	const hidden = useSelector(selectCartHidden);
	const dispatch = useDispatch();

	return (
		<div className="header">
			{/* Link is 'a' tag that doesnt redirects to a different page, but to the simulated url by react-router-dom */}
			<Link className="logo-container" to="/">
				<Logo className="logo" />
			</Link>
			<div className="options">
				{/* The isAdmin property is added directly to the user's firestore doc through console or code. Firebase does provide an admin SDK, but for the sake of simplicity and extra overhead for a simple feature, I avoided it. */}
				{currentUser?.isAdmin ? (
					<Link className="option" to="/admin">
						ADMIN
					</Link>
				) : 
					console.log()
				}
				<Link className="option" to="/shop">
					SHOP
				</Link>
				<Link className="option" to="/orders">
					ORDERS
				</Link>
				{currentUser ? (
					<div className="option" onClick={() => dispatch(signOutStart())}>
						SIGN OUT
					</div>
				) : (
					<Link className="option" to="/sign">
						SIGN IN
					</Link>
				)}
				<CartIcon />
			</div>
			{hidden ? null : <CartDropDown />}
		</div>
	);
};

export default Header;
