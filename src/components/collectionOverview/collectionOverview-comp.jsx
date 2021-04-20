import React from 'react';

import './collectionOverview.scss';

import CollectionPreview from '../collectionPreview/collectionPreview-comp';

const CollectionOverview = ({ collections }) => (
	<div className="collection-overview">
		{collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)}
	</div>
);

export default CollectionOverview;
