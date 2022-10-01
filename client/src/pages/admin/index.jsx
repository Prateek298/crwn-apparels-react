import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './page.scss';

import UsersList from './UsersList';
import AddToShop from './AddToShop';

import { selectCurrentUser } from 'redux/user/user-selectors';

const AdminPage = () => {
	const currentUser = useSelector(selectCurrentUser);

	if (!currentUser?.isAdmin) return <Navigate to="/" />;

	return (
		<div className="admin-container">
			<AddToShop />
			<UsersList />
		</div>
	)
};

export default AdminPage;
