import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { checkUserSession } from 'redux/user/user-actions';

import Header from 'components/Header';
import LoadingSpinner from 'components/LoadingSpinner';
import ErrorBoundary from 'components/ErrorBoundary';

const HomePage = lazy(() => import('pages/home'));
const AuthPage = lazy(() => import('pages/auth'));
const CollectionOverview = lazy(() => import('pages/shop/CollectionOverview'));
const CollectionPage = lazy(() => import('pages/shop/collection'));
const CheckoutPage = lazy(() => import('pages/checkout'));
const AdminPage = lazy(() => import('pages/admin'));
const OrdersPage = lazy(() => import('pages/orders'));

require('dotenv').config();

const App = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user.currentUser);

	console.log(currentUser);

	useEffect(
		() => {
			dispatch(checkUserSession());
		},
		[ dispatch ]
	);

	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path="/" element={<Header />}>
						<Route index element={<HomePage />} />
						<Route path="shop">
							<Route index element={<CollectionOverview />} />
							<Route path=":collectionId" element={<CollectionPage />} />
						</Route>
						<Route path="checkout" element={<CheckoutPage />} />
						<Route path="orders" element={<OrdersPage />} />
						<Route path="sign" element={<AuthPage />} />
						<Route path="admin" element={<AdminPage />} />
					</Route>
				</Routes>
			</Suspense>
		</ErrorBoundary>
	);
};

export default App;
