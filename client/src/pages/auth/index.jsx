import React from 'react';

import './page.scss';

import SignUp from './SignUp';
import SignIn from './SignIn';

const AuthPage = () => (
	<div className="auth-page">
		<SignIn />
		<SignUp />
	</div>
);

export default AuthPage;
