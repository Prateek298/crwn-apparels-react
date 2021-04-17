import React from 'react';
import { useSelector } from 'react-redux';

import './collectionOverview.scss';
import { selectCollectionsForPreview } from '../../redux/shop/shop-selectors';

import CollectionPreview from '../collectionPreview/collectionPreview-comp';

const CollectionOverview = () => {
	const collections = useSelector(selectCollectionsForPreview);
	return (
		<div className="collection-overview">
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
		</div>
	);
};

export default CollectionOverview;
