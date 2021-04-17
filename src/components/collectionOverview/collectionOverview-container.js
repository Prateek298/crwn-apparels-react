import { useSelector } from 'react-redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop-selectors';

import CollectionOverview from './collectionOverview-comp';
import LoadingSpinner from '../loadingSpinner/loadingSpinner-comp';

const CollectionOverviewContainer = () => {
	const isLoading = useSelector(selectIsCollectionFetching);
	return isLoading ? <LoadingSpinner /> : <CollectionOverview />;
};

export default CollectionOverviewContainer;
