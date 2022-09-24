import React from 'react';
import { useSelector } from 'react-redux';

import './CollectionOverview.scss';
import { selectIsCollectionFetching, selectCollectionsForPreview } from 'redux/shop/shop-selectors';

import CollectionPreview from './CollectionPreview';
import LoadingSpinner from 'components/LoadingSpinner';

const CollectionOverview = () => {
	const isLoading = useSelector(selectIsCollectionFetching);
	const collections = useSelector(selectCollectionsForPreview);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="collection-overview">
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
		</div>
	);
};

export default CollectionOverview;
