import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import { checkUserSession } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';

import HomePage from './pages/homepage/homepage-comp';
import ShopPage from './pages/shop/shop-comp';
import AuthPage from './pages/authPage/authPage-comp';
import CheckoutPage from './pages/checkoutPage/checkoutPage-comp';

import Header from './components/header/header-comp';

const App = () => {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	// using useEffect as ComponentDidMount
	useEffect(
		() => {
			dispatch(checkUserSession());
		},
		[ dispatch ]
	);

	return (
		<div>
			<Header />
			{/* Switch works like switch case */}
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/shop" component={ShopPage} />
				<Route exact path="/checkout" component={CheckoutPage} />
				<Route exact path="/sign" render={() => (currentUser ? <Redirect to="/" /> : <AuthPage />)} />
			</Switch>
		</div>
	);
};

export default App;
