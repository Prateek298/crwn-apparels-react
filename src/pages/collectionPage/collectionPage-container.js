import { useSelector } from 'react-redux';

import { selectIsCollectionLoaded } from '../../redux/shop/shop-selectors';

import CollectionPage from './collectionPage-comp';
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner-comp';

const CollectionPageContainer = ({ match }) => {
	const isLoading = !useSelector(selectIsCollectionLoaded);
	return isLoading ? <LoadingSpinner /> : <CollectionPage match={match} />;
};

export default CollectionPageContainer;
