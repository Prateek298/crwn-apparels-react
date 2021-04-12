import React from 'react';
import { connect } from 'react-redux';

import { emailSignUpStart } from '../../redux/user/user-actions';

import './signUp.scss';

import FormInput from '../formInput/formInput-comp';
import CustomButton from '../customButton/customButton-comp';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async e => {
		e.preventDefault();

		const { email, displayName, password, confirmPassword } = this.state;
		const { emailSignUpStart } = this.props;

		if (password !== confirmPassword) {
			alert("Password don't match");
			return;
		}

		emailSignUpStart(email, password, displayName);

		this.setState = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>Sign up with email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						onChange={this.handleChange}
						label="Display Name"
						required
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						onChange={this.handleChange}
						label="Email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
						label="Password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={this.handleChange}
						label="Confirm Password"
						required
					/>
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	emailSignUpStart: (email, password, displayName) => dispatch(emailSignUpStart({ email, password, displayName }))
});

export default connect(null, mapDispatchToProps)(SignUp);
