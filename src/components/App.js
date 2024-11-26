import React from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizMain from "./QuizMain";
import QuizAnswers from "./QuizAnswers";
import Error from "./Error";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";

const App = () => {
	const userData = useSelector((store) => store.user);
	const { userEmail, userToken } = userData;

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
			errorElement: <Error />,
		},
		{
			path: "/quiz",
			element: (
				<ProtectedRoute
					userEmail={userEmail}
					userToken={userToken}
					redirectRoute={"/"}
				>
					<QuizMain />
				</ProtectedRoute>
			),
		},
		{
			path: "/results",
			element: (
				<ProtectedRoute
					userEmail={userEmail}
					userToken={userToken}
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
		{
			path: "/profile",
			element: (
				<ProtectedRoute
					userEmail={userEmail}
					userToken={userToken}
					redirectRoute={"/"}
				>
					<Profile />
				</ProtectedRoute>
			),
		},
	]);
	return <RouterProvider router={router} />;
};

export default App;
