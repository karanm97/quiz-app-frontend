import React, { useState } from "react";
import Header from "./Header";
import TopicSelection from "./TopicSelection";
import QuizPage from "./QuizPage";
import { Outlet } from "react-router";

const QuizMain = () => {
	const [isQuizPageVisible, setIsQuizPageVisible] = useState(false);

	const handleQuizStart = () => {
		setIsQuizPageVisible(true);
	};

	return (
		<div>
			<Header />
			{!isQuizPageVisible && <TopicSelection startQuiz={handleQuizStart} />}
			{isQuizPageVisible && <QuizPage />}
			<Outlet />
		</div>
	);
};

export default QuizMain;
