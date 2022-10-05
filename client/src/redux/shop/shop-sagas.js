import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebaseConfig';
import {
	fetchCollections,
	isCollectionsFetching,
	setCollections,
	setError,
} from './shop-actions';

function* watchFetchCollections() {
	yield takeLatest(fetchCollections, fetchCollectionsAsync);
}

function* fetchCollectionsAsync() {
	try {
		yield put(isCollectionsFetching(true));

		const collectionsRef = firestore.collection('collections');
		const snapshot = yield collectionsRef.get();
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
		yield put(setCollections(collectionsMap));
	} catch (err) {
		console.log(err);
		yield put(setError('Something went wrong...'));
	} finally {
		yield put(isCollectionsFetching(false));
	}
}

export function* shopSagas() {
	yield all([call(watchFetchCollections)]);
}
