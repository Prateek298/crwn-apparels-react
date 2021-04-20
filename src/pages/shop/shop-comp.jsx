import React from 'react';
import { Route } from 'react-router-dom';

import { default as CollectionOverview } from '../../components/collectionOverview/collectionOverview-container';
import { default as CollectionPage } from '../collectionPage/collectionPage-container';

const ShopPage = ({ match }) => (
	<div className="shop-page">
		<Route exact path={`${match.path}`} component={CollectionOverview} />
		<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
	</div>
);

export default ShopPage;
