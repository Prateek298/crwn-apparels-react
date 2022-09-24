import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import './MenuItem.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
	const history = useHistory();
	const match = useRouteMatch();

	return (
		<div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
			{/* div for changing background image on different MenuItems */}
			<div className="bg-img" style={{ backgroundImage: `url(${imageUrl})` }} />

			<div className="content">
				<h1 className="title">{title.toUpperCase()}</h1>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</div>
	);
};

export default MenuItem;
