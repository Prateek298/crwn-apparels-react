import React from 'react';
import { useSelector } from 'react-redux';

import './page.scss';

import { selectCollection, selectIsCollectionLoaded } from 'redux/shop/shop-selectors';

import CollectionItem from 'components/CollectionItem';
import LoadingSpinner from 'components/LoadingSpinner';

const CollectionPage = ({ match }) => {
	const isLoading = !useSelector(selectIsCollectionLoaded);
	const collection = useSelector(selectCollection(match.params.collectionId));
	const { title, items } = collection;

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div className="collection-page">
			<h2 className="title">{title}</h2>
			<div className="items">{items.map(item => <CollectionItem key={item.id} item={item} />)}</div>
		</div>
	);
};

export default CollectionPage;
