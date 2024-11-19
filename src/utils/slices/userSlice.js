import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userEmail: null,
	},
	reducers: {
		addUserEmail: (state, action) => {
			state.userEmail = action.payload;
		},
		removeUserEmail: (state) => {
			state.userEmail = null;
		},
	},
});

export const { addUserEmail, removeUserEmail } = userSlice.actions;
export default userSlice.reducer;
