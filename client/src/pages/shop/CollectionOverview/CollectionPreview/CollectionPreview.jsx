import React from 'react';
import { useNavigate } from 'react-router-dom';

import './CollectionPreview.scss';

import CollectionItem from 'components/CollectionItem';

const CollectionPreview = ({ title, items }) => {
	const navigate = useNavigate();

	return (
		<div className="collection-preview">
			<h1 className="title" onClick={() => navigate(title.toLowerCase())}>
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
