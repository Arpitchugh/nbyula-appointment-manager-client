import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: null,
	isLoggedIn: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export const userActions = userSlice.actions;
export default userSlice;
