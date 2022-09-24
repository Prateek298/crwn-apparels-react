import React, { useState, useEffect } from 'react';

import { firestore } from 'firebaseConfig.js';

import './UsersList.scss';

const UsersList = () => {
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		async function getAllUsers() {
			try {
				const reqList = [];
				const usersCollectionRef = await firestore.collection('users').get();

				for (const user of usersCollectionRef.docs) {
					const { displayName, email } = user.data();

					const userCartSnap = await firestore.collection('carts').where('userId', '==', user.id).get();
					const { totalPurchase } = userCartSnap.docs[0].data();

					reqList.push({
						userId: user.id,
						displayName,
						email,
						totalPurchase
					});
				}
				setUsers(reqList);
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
						<th>Total spent</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						const { userId, displayName, email, totalPurchase } = user;
						return (
							<tr key={userId}>
								<td>{displayName}</td>
								<td>{email}</td>
								<td>{totalPurchase}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UsersList;
