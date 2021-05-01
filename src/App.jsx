import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import { checkUserSession } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';

import Header from './components/header/header-comp';
import LoadingSpinner from './components/loadingSpinner/loadingSpinner-comp';
import ErrorBoundary from './components/errorBoundary/errorBoundary-comp';

const HomePage = lazy(() => import('./pages/homepage/homepage-comp'));
const ShopPage = lazy(() => import('./pages/shop/shop-comp'));
const AuthPage = lazy(() => import('./pages/authPage/authPage-comp'));
const CheckoutPage = lazy(() => import('./pages/checkoutPage/checkoutPage-comp'));
const AdminPage = lazy(() => import('./pages/adminPage/adminPage-comp'));

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
						<Route exact path="/sign" render={() => (currentUser ? <Redirect to="/" /> : <AuthPage />)} />
						<Route
							exact
							path="/admin"
							render={() =>
								currentUser?.id === process.env.REACT_APP_ADMIN_UID ? <AdminPage /> : <Redirect to="/" />}
						/>
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
};

export default App;
