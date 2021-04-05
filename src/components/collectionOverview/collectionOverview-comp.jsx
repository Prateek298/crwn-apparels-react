import React from 'react';
import { connect } from 'react-redux';

import './collectionOverview.scss';

import { selectCollectionsForPreview } from '../../redux/shop/shop-selectors';

import CollectionPreview from '../collectionPreview/collectionPreview-comp';

const CollectionOverview = ({ collections }) => (
	<div className="collection-overview">
		{collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)}
	</div>
);

const mapStateToProps = state => ({
	collections: selectCollectionsForPreview(state)
});

export default connect(mapStateToProps)(CollectionOverview);
