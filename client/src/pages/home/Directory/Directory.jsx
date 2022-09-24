import React from 'react';
import { useSelector } from 'react-redux';

import './Directory.scss';

import { selectDirectorySections } from 'redux/directory/directory-selectors';

import MenuItem from '../MenuItem';

const Directory = () => {
	const sections = useSelector(selectDirectorySections);
	return (
		<div className="directory">
			{sections.map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} />)}
		</div>
	);
};

export default Directory;
