import React from 'react';

import './collectionPage.scss';

import { default as CollectionItem } from '../../components/collectionItem/collectionItem-container';

const CollectionPage = ({ collection }) => {
	const { title, items } = collection;
	return (
		<div className="collection-page">
			<h2 className="title">{title}</h2>
			<div className="items">{items.map(item => <CollectionItem key={item.id} item={item} />)}</div>
		</div>
	);
};

export default CollectionPage;
