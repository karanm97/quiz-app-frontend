import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
	name: "questions",
	initialState: [],
	reducers: {
		addQuestionsToState: (state, action) => {
			return action.payload;
		},
		addUserAnswersToQuestion: (state, action) => {
			const answers = action.payload;
			answers.map((answer, index) => {
				state[index]["userAnswer"] = answer;
			});
		},
	},
});

export const { addQuestionsToState, addUserAnswersToQuestion } =
	questionSlice.actions;

export default questionSlice.reducer;
