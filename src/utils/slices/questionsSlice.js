import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
	name: "questions",
	initialState: [],
	reducers: {
		addQuestionsToState: (state, action) => {
			return action.payload;
		},
	},
});

export const { addQuestionsToState } = questionSlice.actions;

export default questionSlice.reducer;
