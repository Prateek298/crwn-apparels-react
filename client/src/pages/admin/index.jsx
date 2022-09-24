import React from 'react';

import './page.scss';

import UsersList from './UsersList';
import AddToShop from './AddToShop';

const AdminPage = () => (
	<div className="admin-container">
		<AddToShop />
		<UsersList />
	</div>
);

export default AdminPage;
