import React from 'react';
import { connect } from 'react-redux';

import './directory.scss';

import { selectDirectorySections } from '../../redux/directory/directory-selectors';

import MenuItem from '../menu-item/menu-item-comp';

const Directory = ({ sections }) => (
	<div className="directory">
		{sections.map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} />)}
	</div>
);

const mapStateToProps = state => ({
	sections: selectDirectorySections(state)
});

export default connect(mapStateToProps)(Directory);
