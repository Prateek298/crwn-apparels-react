import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './header.scss';

import { selectCurrentUser } from '../../redux/user/user-selectors';
import { selectCartHidden } from '../../redux/cart/cart-selectors';
import { signOutStart } from '../../redux/user/user-actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cartIcon/cartIcon-comp';
import CartDropDown from '../cartDropDown/cartDropDown-comp';

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
				{currentUser?.id === process.env.REACT_APP_ADMIN_UID ? (
					<Link className="option" to="/admin">
						ADMIN
					</Link>
				) : 
					console.log()
				}
				<Link className="option" to="/shop">
					SHOP
				</Link>
				<Link className="option" to="/shop">
					CONTACT
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
