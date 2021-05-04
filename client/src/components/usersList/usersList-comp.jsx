import React, { useState, useEffect } from 'react';

import { firestore } from '../../firebaseConfig';

import './usersList.scss';

const UsersList = () => {
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		async function getAllUsers() {
			try {
				const usersCollectionRef = await firestore.collection('users').get();
				setUsers(usersCollectionRef.docs.map(user => user));
			} catch (err) {
				console.log(err.message);
			}
		}
		getAllUsers();
	}, []);

	return (
		<div className="users-container">
			<h2 className="title">UsersList</h2>
			<table className="users-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						const { displayName, email } = user.data();
						return (
							<tr key={user.id}>
								<td>{displayName}</td>
								<td>{email}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UsersList;
