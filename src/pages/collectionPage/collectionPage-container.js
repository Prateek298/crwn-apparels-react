import { connect } from 'react-redux';
import { compose } from 'redux';

import { selectIsCollectionLoaded } from '../../redux/shop/shop-selectors';

import CollectionPage from './collectionPage-comp';
import WithSpinner from '../../components/withSpinner/withSpinner-comp';

const mapStateToProps = state => ({
	isLoading: !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);

export default CollectionPageContainer;
