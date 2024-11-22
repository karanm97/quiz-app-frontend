import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import TopicSelection from "./components/TopicSelection";
import QuizPage from "./components/QuizPage";
import Leaderboard from "./components/Leaderboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizMain from "./components/QuizMain";
import QuizAnswers from "./components/QuizAnswers";
import Error from "./components/Error";

const App = () => {
	return (
		<>
			<Header />
			{/* <Leaderboard /> */}
			{/* <QuizPage /> */}
			{/* <TopicSelection /> */}
			{/* <Login /> */}
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		errorElement: <Error />,
	},
	{
		path: "/quiz",
		element: <QuizMain />,
		children: [
			{
				path: "results",
				element: <QuizAnswers />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
