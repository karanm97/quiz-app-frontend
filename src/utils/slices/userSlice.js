import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userEmail: null,
		userToken: localStorage.getItem("user_token") || null,
	},
	reducers: {
		addUserData: (state, action) => {
			state.userEmail = action.payload.email;
			state.userToken = action.payload.token;
			localStorage.setItem("user_token", action.payload.token);
		},
		removeUserData: (state) => {
			state.userEmail = null;
			state.userToken = null;
			localStorage.removeItem("user_token");
		},
	},
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
