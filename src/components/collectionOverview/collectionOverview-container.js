import { connect } from 'react-redux';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop-selectors';

import CollectionOverview from './collectionOverview-comp';
import WithSpinner from '../withSpinner/withSpinner-comp';

const mapStateToProps = state => ({
	isLoading: selectIsCollectionFetching(state)
});

// Equivalent to connect(mapStateToProps)(WithSpinner(CollectionOverview))
const CollectionOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionOverview);

export default CollectionOverviewContainer;
