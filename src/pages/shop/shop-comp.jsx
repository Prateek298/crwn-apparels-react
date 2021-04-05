import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collectionOverview/collectionOverview-comp';
import CollectionPage from '../collectionPage/collectionPage-comp';

const ShopPage = ({ match }) => {
	console.log(match);
	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionOverview} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
		</div>
	);
};

export default ShopPage;
