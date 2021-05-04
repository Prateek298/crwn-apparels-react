import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './signIn.scss';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user-actions';

import FormInput from '../formInput/formInput-comp';
import CustomButton from '../customButton/customButton-comp';

const SignIn = () => {
	const dispatch = useDispatch();

	const [ userCredentials, setUserCredentials ] = useState({ email: '', password: '' });
	const { email, password } = userCredentials;

	const handleSubmit = async e => {
		e.preventDefault();

		dispatch(emailSignInStart({ email, password }));
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2 className="title">I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput name="email" type="email" value={email} label="email" handleChange={handleChange} required />
				<FormInput
					name="password"
					type="password"
					value={password}
					label="password"
					handleChange={handleChange}
					required
				/>
				<div className="buttons">
					<CustomButton type="submit">SIGN IN</CustomButton>
					<CustomButton type="button" onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>
						SIGN IN WITH GOOGLE
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
