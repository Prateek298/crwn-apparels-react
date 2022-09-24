import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import { checkUserSession } from 'redux/user/user-actions';
import { selectCurrentUser } from 'redux/user/user-selectors';

import Header from 'components/Header';
import LoadingSpinner from 'components/LoadingSpinner';
import ErrorBoundary from 'components/ErrorBoundary';

const HomePage = lazy(() => import('pages/home'));
const ShopPage = lazy(() => import('pages/shop'));
const AuthPage = lazy(() => import('pages/auth'));
const CheckoutPage = lazy(() => import('pages/checkout'));
const AdminPage = lazy(() => import('pages/admin'));
const OrdersPage = lazy(() => import('pages/orders'));

require('dotenv').config();

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
				<ErrorBoundary>
					<Suspense fallback={<LoadingSpinner />}>
						<Route exact path="/" component={HomePage} />
						<Route path="/shop" component={ShopPage} />
						<Route exact path="/checkout" component={CheckoutPage} />
						<Route exact path="/orders" render={() => (!currentUser ? <Redirect to="/sign" /> : <OrdersPage />)} />
						<Route exact path="/sign" render={() => (currentUser ? <Redirect to="/" /> : <AuthPage />)} />
						{/* The isAdmin property is added directly to the user's firestore doc through console or code. Firebase does provide an admin SDK, but for the sake of simplicity and extra overhead for a simple feature, I avoided it. */}
						<Route
							exact
							path="/admin"
							render={() =>
								currentUser?.isAdmin ? <AdminPage /> : <Redirect to="/" />}
						/>
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
};

export default App;
