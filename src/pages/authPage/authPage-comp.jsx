import React from 'react';

import './authPage.scss';

import SignUp from '../../components/signUp/signUp-comp';
import SignIn from '../../components/signIn/signIn-comp';

const AuthPage = () => (
	<div className="auth-page">
		<SignIn />
		<SignUp />
	</div>
);

export default AuthPage;
