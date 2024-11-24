import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Header from "./Header";
import { Provider, useSelector } from "react-redux";
import { store } from "../utils/store";
import TopicSelection from "./TopicSelection";
import QuizPage from "./QuizPage";
import Leaderboard from "./Leaderboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizMain from "./QuizMain";
import QuizAnswers from "./QuizAnswers";
import Error from "./Error";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
	const isAuthenticated = useSelector((store) => store.user.userEmail);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
			errorElement: <Error />,
		},
		{
			path: "/quiz",
			element: (
				<ProtectedRoute isAuthenticated={isAuthenticated} redirectRoute={"/"}>
					<QuizMain />
				</ProtectedRoute>
			),
		},
		{
			path: "/results",
			element: (
				<ProtectedRoute
					isAuthenticated={isAuthenticated}
					redirectRoute={"/quiz"}
				>
					<QuizAnswers />
				</ProtectedRoute>
			),
		},
	]);
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
