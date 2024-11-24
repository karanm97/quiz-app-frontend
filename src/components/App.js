import React from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import QuizMain from "./QuizMain";
import QuizAnswers from "./QuizAnswers";
import Error from "./Error";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";

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
		{
			path: "/leaderboard",
			element: <Leaderboard />,
		},
	]);
	return (
		<RouterProvider router={router}>
			<Header />
		</RouterProvider>
	);
};

export default App;
