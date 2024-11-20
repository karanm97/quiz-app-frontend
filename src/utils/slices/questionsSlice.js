import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
	name: "questions",
	initialState: {
		questions: null,
	},
	reducers: {
		addQuestionsToState: (state, action) => {
			state.questions = action.payload;
		},
	},
});

export const { addQuestionsToState } = questionSlice.actions;

export default questionSlice.reducer;
