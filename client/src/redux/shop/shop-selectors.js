import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector([ selectShop ], shop => shop.collections);

// Since collections is being fetched from DB, it is async, so we set collections to []
export const selectCollectionsForPreview = createSelector(
	[ selectCollections ],
	collections => (collections ? Object.keys(collections).map(key => collections[key]) : [])
);

export const selectCollection = memoize(collectionUrlParam =>
	createSelector([ selectCollections ], collections => (collections ? collections[collectionUrlParam] : null))
);

export const selectIsCollectionFetching = createSelector([ selectShop ], shop => shop.isFetching);

export const selectIsCollectionLoaded = createSelector([ selectShop ], shop => !!shop.collections);
