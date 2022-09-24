import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { emailSignUpStart } from 'redux/user/user-actions';

import './SignUp.scss';

import FormInput from 'components/FormInput';
import CustomButton from 'components/CustomButton';

const SignUp = () => {
	const dispatch = useDispatch();

	const [ userCredentials, setUserCredentials ] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const { email, displayName, password, confirmPassword } = userCredentials;

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Password don't match");
			return;
		}

		dispatch(emailSignUpStart({ email, password, displayName }));
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-up">
			<h2 className="title">I do not have an account</h2>
			<span>Sign up with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					label="Display Name"
					required
				/>
				<FormInput type="email" name="email" value={email} onChange={handleChange} label="Email" required />
				<FormInput
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					label="Confirm Password"
					required
				/>
				<CustomButton type="submit">SIGN UP</CustomButton>
			</form>
		</div>
	);
};

export default SignUp;
