import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './header.scss';

import { selectCurrentUser } from '../../redux/user/user-selectors';
import { selectCartHidden } from '../../redux/cart/cart-selectors';
import { signOutStart } from '../../redux/user/user-actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cartIcon/cartIcon-comp';
import CartDropDown from '../cartDropDown/cartDropDown-comp';

const Header = ({ currentUser, hidden, signOutStart }) => (
	<div className="header">
		{/* Link is 'a' tag that doesnt redirects to a different page, but to the simulated url by react-router-dom */}
		<Link className="logo-container" to="/">
			<Logo className="logo" />
		</Link>
		<div className="options">
			<Link className="option" to="/shop">
				SHOP
			</Link>
			<Link className="option" to="/shop">
				CONTACT
			</Link>
			{currentUser ? (
				<div className="option" onClick={signOutStart}>
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

// createStructuredSelector automatically passes the argument i.e. state to the selector functions
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
