import ShopActionTypes from './shop-action-types';

export const updateCollections = collectionsMap => ({
	type: ShopActionTypes.UPDATE_COLLECTIONS,
	payload: collectionsMap
});
