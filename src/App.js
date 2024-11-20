import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import TopicSelection from "./components/TopicSelection";
import QuizPage from "./components/QuizPage";
import Leaderboard from "./components/Leaderboard";

const App = () => {
	return (
		<>
			<Provider store={store}>
				<Header />
				{/* <Leaderboard /> */}
				{/* <QuizPage /> */}
				{/* <TopicSelection /> */}
				{/* <Login /> */}
			</Provider>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
