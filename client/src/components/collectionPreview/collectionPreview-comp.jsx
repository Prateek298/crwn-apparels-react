import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import './collectionPreview.scss';

import CollectionItem from '../collectionItem/collectionItem-comp';

const CollectionPreview = ({ title, items }) => {
	const history = useHistory();
	const match = useRouteMatch();
	return (
		<div className="collection-preview">
			<h1 className="title" onClick={() => history.push(`${match.url}/${title.toLowerCase()}`)}>
				{title.toUpperCase()}
			</h1>
			<div className="preview">
				{items
					.filter((item, idx) => idx < 4)
					.map(item => <CollectionItem key={item.id} item={item} onPreview={true} />)}
			</div>
		</div>
	);
};

export default CollectionPreview;
