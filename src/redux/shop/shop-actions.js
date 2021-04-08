import ShopActionTypes from './shop-action-types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebaseConfig';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage
});

// leveraging redux-thunk to dispatch action functions when needed
export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		const collectionsRef = firestore.collection('collections');
		dispatch(fetchCollectionsStart());

		collectionsRef
			.get()
			.then(snapshot => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch(err => dispatch(fetchCollectionsFailure(err.message)));
	};
};
