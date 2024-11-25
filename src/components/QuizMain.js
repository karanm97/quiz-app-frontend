import React, { useEffect, useState } from "react";
import Header from "./Header";
import TopicSelection from "./TopicSelection";
import QuizPage from "./QuizPage";

const QuizMain = () => {
	const [isQuizPageVisible, setIsQuizPageVisible] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [isQuizPageVisible]);

	const handleQuizStart = () => {
		setIsQuizPageVisible(true);
	};

	return (
		<div>
			<Header />
			{!isQuizPageVisible && <TopicSelection startQuiz={handleQuizStart} />}
			{isQuizPageVisible && <QuizPage />}
		</div>
	);
};

export default QuizMain;
