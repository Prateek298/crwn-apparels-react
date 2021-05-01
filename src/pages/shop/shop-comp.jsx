import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop-actions';

import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner-comp';

const CollectionOverview = lazy(() => import('../../components/collectionOverview/collectionOverview-container'));
const CollectionPage = lazy(() => import('../collectionPage/collectionPage-container'));

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
			<Suspense fallback={<LoadingSpinner />}>
				<Route exact path={`${match.path}`} component={CollectionOverview} />
				<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
			</Suspense>
		</div>
	);
};

export default ShopPage;
