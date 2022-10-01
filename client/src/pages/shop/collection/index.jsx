import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './page.scss';

import { selectCollection, selectIsCollectionLoaded } from 'redux/shop/shop-selectors';
import { fetchCollectionsStart } from 'redux/shop/shop-actions';

import CollectionItem from 'components/CollectionItem';
import LoadingSpinner from 'components/LoadingSpinner';

const CollectionPage = () => {
	const { collectionId } = useParams();
	const isLoading = !useSelector(selectIsCollectionLoaded);
	const collection = useSelector(selectCollection(collectionId));

	const dispatch = useDispatch();
	
	useEffect(() => {
			dispatch(fetchCollectionsStart());
		}, [ dispatch ]
	);

	if (!collection || isLoading) return <LoadingSpinner />;

	const { title, items } = collection;

	return (
		<div className="collection-page">
			<h2 className="title">{title}</h2>
			<div className="items">{items.map(item => <CollectionItem key={item.id} item={item} />)}</div>
		</div>
	);
};

export default CollectionPage;
