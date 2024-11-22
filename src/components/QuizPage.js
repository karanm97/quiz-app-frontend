import React, { useEffect, useState } from "react";
import { questions } from "../constants/questions";
import { redirect, useNavigate } from "react-router";

const QuizPage = () => {
	const [quizQuestions, setQuizQuestions] = useState();
	const [answers, setAnswers] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setQuizQuestions(questions);
	}, []);

	console.log(quizQuestions);

	const handleOptionClick = (e) => {
		const questionNo = e.target.dataset["question"];
		console.log(questionNo);
		// const selectedOption = e.target.dataset["option"];
		const selectedOption = e.target.innerText;
		console.log(selectedOption);
	};

	const handleSubmit = () => {
		navigate("/quiz/results");
	};

	if (!quizQuestions) return null;

	return (
		<div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
			<h1 className="text-3xl font-semibold text-center mb-8">Quiz</h1>

			{quizQuestions.map((quizQuestion, index) => {
				const { question, optionA, optionB, optionC, optionD } = quizQuestion;

				return (
					<div
						key={question}
						className="bg-white p-6 mb-6 rounded-lg shadow-md"
					>
						{/* Question Text */}
						<div className="text-xl font-medium text-gray-800 mb-4">
							{"Q." + (index + 1) + " " + question}
						</div>

						{/* Options */}
						<div className="space-y-4">
							{[
								{ label: "A", option: optionA },
								{ label: "B", option: optionB },
								{ label: "C", option: optionC },
								{ label: "D", option: optionD },
							].map(({ label, option }, optionNo) => (
								<button
									key={label}
									className="text-left w-full px-2 py-3 text-lg font-semibold rounded-md focus:outline-none transition-all duration-200 bg-gray-200 hover:bg-gray-300 border-2 border-transparent hover:border-gray-400"
									data-question={index}
									data-option={optionNo}
									onClick={handleOptionClick}
								>
									{option}
									{/* {`${label}. ${option}`} */}
								</button>
							))}
						</div>
					</div>
				);
			})}
			<div className="mt-8 text-center">
				<button
					onClick={handleSubmit}
					className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md transition-all duration-200 hover:bg-green-600"
				>
					Submit Quiz
				</button>
			</div>
		</div>
	);
};

export default QuizPage;
