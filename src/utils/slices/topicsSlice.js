import { createSlice } from "@reduxjs/toolkit";

const topicsSlice = createSlice({
	name: "topics",
	initialState: [],
	reducers: {
		addTopicsToState: (state, action) => {
			return action.payload;
		},
	},
});

export const { addTopicsToState } = topicsSlice.actions;

export default topicsSlice.reducer;
