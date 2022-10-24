import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
	currentUser: null,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		setCurrentUser: (state, { payload }) => {
			state.currentUser = payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
		},
	},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
