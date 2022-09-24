import React from 'react';

import './CustomButton.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
	<button
		className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${inverted ? 'inverted' : ''} custom-button`}
		{...otherProps}
	>
		{children}
	</button>
);

export default CustomButton;
