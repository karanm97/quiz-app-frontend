import { configureStore, createStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import topicsReducer from "./slices/topicsSlice";
import questionsReducer from "./slices/questionsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		topics: topicsReducer,
		questions: questionsReducer,
	},
});
