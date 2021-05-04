import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from './shop-action-types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebaseConfig';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop-actions';

// Generator function
function* fetchCollectionsStart() {
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

function* fetchCollectionsAsync() {
	try {
		const collectionsRef = firestore.collection('collections');
		// 'yield' is somewhat similar to 'await'
		const snapshot = yield collectionsRef.get();
		// we use 'call' effect to invoke the function the 1st param func with rest params as parameters to it and to make the function call yield
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
		// 'put' effect is similar to dispatch
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (err) {
		yield put(fetchCollectionsFailure(err.message));
	}
}

export function* shopSagas() {
	yield all([ call(fetchCollectionsStart) ]);
}
