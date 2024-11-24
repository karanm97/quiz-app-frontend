import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUserAnswersToQuestion } from "../utils/slices/questionsSlice";

const QuizPage = () => {
	const questions = useSelector((store) => store.questions);
	const [answers, setAnswers] = useState(Array(10).fill(null));
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(questions);
	console.log(answers);

	const handleOptionClick = (e) => {
		const questionIndex = e.target.dataset["question"];
		// console.log("Question index ", questionIndex);
		const userSelectedOption = e.target.innerText;
		// console.log("Selected Answer ", userSelectedOption);
		let data = [...answers];
		data[questionIndex] = userSelectedOption;
		setAnswers(data);
	};

	const handleSubmit = () => {
		let correctAnswerCount = 0;
		answers.map((answer, index) => {
			if (questions[index].correctAnswer === answer) {
				correctAnswerCount += 1;
			}
		});
		console.log("Correct Answers - ", correctAnswerCount);
		dispatch(addUserAnswersToQuestion(answers));
		navigate("/quiz/results");
	};

	if (!questions) return null;

	return (
		<div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
			<h1 className="text-3xl font-semibold text-center mb-8">Quiz</h1>

			{questions.map((quizQuestion, index) => {
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
								<div className="w-full" key={label}>
									<label className="w-1/12 text-lg font-semibold rounded-md px-2 py-3 bg-gray-100">
										{label}
									</label>
									<button
										className={`text-left w-11/12 px-2 py-3 text-lg font-semibold rounded-md focus:outline-none bg-gray-200 hover:bg-gray-300 border-2 border-transparent hover:border-gray-400 
										${answers[index] === option && " bg-blue-400"}
									`}
										data-question={index}
										data-option={optionNo}
										onClick={handleOptionClick}
									>
										{option}
									</button>
								</div>
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
