import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUserAnswersToQuestion } from "../utils/slices/questionsSlice";
import { CheckCircle } from "lucide-react";

const QuizPage = () => {
	const questions = useSelector((store) => store.questions);
	const [answers, setAnswers] = useState(Array(10).fill(null));
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleOptionClick = (questionIndex, selectedOption) => {
		let updatedAnswers = [...answers];
		updatedAnswers[questionIndex] = selectedOption;
		setAnswers(updatedAnswers);
	};

	const handleSubmit = () => {
		let correctAnswerCount = 0;
		answers.forEach((answer, index) => {
			if (questions[index].correctAnswer === answer) {
				correctAnswerCount += 1;
			}
		});
		dispatch(addUserAnswersToQuestion(answers));
		navigate("/quiz/results");
	};

	const answeredCount = answers.filter((answer) => answer !== null).length;
	const progressPercentage = (answeredCount / questions.length) * 100;

	if (!questions) return null;

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="bg-white rounded-xl shadow-lg p-6 mb-8">
					<h1 className="text-3xl font-bold text-gray-900 text-center">
						Quiz Challenge
					</h1>

					{/* Progress Bar */}
					<div className="mt-6">
						<div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
							<span>
								{answeredCount} of {questions.length} questions answered
							</span>
							<span>{Math.round(progressPercentage)}% complete</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
								style={{ width: `${progressPercentage}%` }}
							></div>
						</div>
					</div>
				</div>

				{/* Questions */}
				{questions.map((quizQuestion, index) => {
					const { question, optionA, optionB, optionC, optionD } = quizQuestion;
					const isAnswered = answers[index] !== null;

					return (
						<div
							key={question}
							className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all duration-200 hover:shadow-xl"
						>
							{/* Question Number and Text */}
							<div className="flex items-start mb-6">
								<span className="flex items-center justify-center bg-blue-100 text-blue-600 rounded-full w-8 h-8 font-bold text-sm mr-4 flex-shrink-0">
									{index + 1}
								</span>
								<h2 className="text-xl font-medium text-gray-800">
									{question}
								</h2>
							</div>

							{/* Options */}
							<div className="space-y-3">
								{[
									{ label: "A", option: optionA },
									{ label: "B", option: optionB },
									{ label: "C", option: optionC },
									{ label: "D", option: optionD },
								].map(({ label, option }) => {
									const isSelected = answers[index] === option;

									return (
										<button
											key={label}
											className={`w-full p-4 rounded-lg text-left transition-all duration-200 group
                        ${
													isSelected
														? "bg-blue-100 border-2 border-blue-500 text-blue-700"
														: "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
												}`}
											onClick={() => handleOptionClick(index, option)}
										>
											<div className="flex items-center">
												<span
													className={`flex items-center justify-center w-8 h-8 rounded-full mr-4
                          ${
														isSelected
															? "bg-blue-500 text-white"
															: "bg-gray-200 group-hover:bg-gray-300 text-gray-700"
													}`}
												>
													{label}
												</span>
												<span className="text-lg font-medium">{option}</span>
												{isSelected && (
													<CheckCircle className="ml-auto text-blue-500 w-6 h-6" />
												)}
											</div>
										</button>
									);
								})}
							</div>
						</div>
					);
				})}

				{/* Submit Button */}
				<div className="sticky bottom-8">
					<div className="bg-white rounded-xl shadow-lg p-6">
						<div className="flex items-center justify-between">
							<div className="text-gray-600">
								<span className="font-medium">{answeredCount}</span> of{" "}
								<span className="font-medium">{questions.length}</span>{" "}
								questions answered
							</div>
							<button
								onClick={handleSubmit}
								disabled={answeredCount !== questions.length}
								className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                  ${
										answeredCount === questions.length
											? "bg-blue-600 hover:bg-blue-700 text-white"
											: "bg-gray-200 text-gray-500 cursor-not-allowed"
									}`}
							>
								{answeredCount === questions.length
									? "Submit Quiz"
									: "Answer all questions to submit"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizPage;
