import React from 'react';

import './formInput.scss';

const FormInput = ({ label, handleChange, ...otherProps }) => (
	<div className="form-group">
		<input className="form-control" onChange={handleChange} {...otherProps} />
		{label ? (
			<label className={`${otherProps.value.length ? 'shrink' : ''} form-group-label`}>{label}</label>
		) : null}
	</div>
);

export default FormInput;
