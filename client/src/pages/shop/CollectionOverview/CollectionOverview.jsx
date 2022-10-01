import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './CollectionOverview.scss';

import { selectIsCollectionFetching, selectCollectionsForPreview } from 'redux/shop/shop-selectors';
import { fetchCollectionsStart } from 'redux/shop/shop-actions';

import CollectionPreview from './CollectionPreview';
import LoadingSpinner from 'components/LoadingSpinner';

const CollectionOverview = () => {
	const isLoading = useSelector(selectIsCollectionFetching);
	const collections = useSelector(selectCollectionsForPreview);

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(fetchCollectionsStart());
		},
		[ dispatch ]
	);

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
