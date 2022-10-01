import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './page.scss';

import SignUp from './SignUp';
import SignIn from './SignIn';

import { selectCurrentUser } from 'redux/user/user-selectors';

const AuthPage = () => {
	const currentUser = useSelector(selectCurrentUser);

	if (currentUser) return <Navigate to="/" />;

	return (
		<div className="auth-page">
			<SignIn />
			<SignUp />
		</div>
	)
};

export default AuthPage;
