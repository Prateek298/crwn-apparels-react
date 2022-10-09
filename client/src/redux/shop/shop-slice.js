import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
	collections: null,
	isFetching: false,
	error: null,
};

const shopSlice = createSlice({
	name: 'shop',
	initialState: INITIAL_STATE,
	reducers: {
		isCollectionsFetching: (state, { payload }) => {
			state.isFetching = payload;
		},
		setCollections: (state, { payload }) => {
			state.collections = payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
		},
	},
});

export const shopActions = shopSlice.actions;

export default shopSlice.reducer;
