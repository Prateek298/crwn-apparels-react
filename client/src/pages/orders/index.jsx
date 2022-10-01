import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './page.scss';

import CheckoutItem from 'components/CheckoutItem';

import { selectCurrentUser } from 'redux/user/user-selectors'
import { selectPastOrders, selectTotalPurchase } from 'redux/cart/cart-selectors';

const OrdersPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const pastOrders = useSelector(selectPastOrders);
	const totalPurchase = useSelector(selectTotalPurchase);

	if (!currentUser) return <Navigate to="/" />;

	return pastOrders.length ? (
		<div className="orders-page">
			<h1>Your Orders</h1>
			<div className="orders-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{pastOrders.map(pastOrder => <CheckoutItem key={pastOrder.id} cartItem={pastOrder} asPastOrder />)}
			<div className="total">
				<span>Total: &#8377;{totalPurchase}</span>
			</div>
		</div>
	) : (
		<h5>No orders has been placed by you yet</h5>
	);
};

export default OrdersPage;
