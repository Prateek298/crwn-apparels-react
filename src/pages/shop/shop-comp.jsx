import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop-actions';

import CollectionOverviewContainer from '../../components/collectionOverview/collectionOverview-container';
import CollectionPageContainer from '../collectionPage/collectionPage-container';

const ShopPage = ({ match }) => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(fetchCollectionsStart());
		},
		[ dispatch ]
	);

	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
		</div>
	);
};

export default ShopPage;
