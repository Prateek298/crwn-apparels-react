import React from 'react';

import './adminPage.scss';

import UsersList from '../../components/usersList/usersList-comp';
import AddToShop from '../../components/addToShop/addToShop-comp';

const AdminPage = () => (
	<div className="admin-container">
		<AddToShop />
		<UsersList />
	</div>
);

export default AdminPage;
