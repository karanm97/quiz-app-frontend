import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CircleCheck, XCircle, Trophy, Target } from "lucide-react";
import { useNavigate } from "react-router";
import Header from "./Header";

const QuizAnswers = () => {
	const userEmail = useSelector((store) => store.user.userEmail);
	const questions = useSelector((store) => store.questions);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let correctCount = 0;
	questions.forEach((question) => {
		if (question.userAnswer === question.correctAnswer) {
			correctCount += 1;
		}
	});

	const postData = async () => {
		const response = await fetch("http://localhost:3000/api/leaderboard", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userEmail,
				score: correctCount,
			}),
		});

		const responseJSON = await response.json();
	};

	postData();

	const scorePercentage = (correctCount / questions.length) * 100;

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Score Card */}
					<div className="bg-white rounded-xl shadow-lg p-8 mb-8">
						<div className="text-center">
							<Trophy className="w-16 h-16 mx-auto mb-4 text-blue-600" />
							<h1 className="text-4xl font-bold text-gray-900 mb-2">
								Quiz Results
							</h1>
							<div className="text-6xl font-bold text-blue-600 mb-4">
								{correctCount}/{questions.length}
							</div>
							<div className="text-gray-600 text-xl mb-6">
								You scored {Math.round(scorePercentage)}%
							</div>

							{/* Progress Bar */}
							<div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
								<div
									className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
									style={{ width: `${scorePercentage}%` }}
								></div>
							</div>

							{/* Score Message */}
							<p className="text-gray-600">
								{scorePercentage === 100
									? "Perfect score! Excellent work! 🎉"
									: scorePercentage >= 80
									? "Great job! Keep it up! 🌟"
									: scorePercentage >= 60
									? "Good effort! Room for improvement! 💪"
									: "Keep practicing! You'll do better next time! 📚"}
							</p>
						</div>
					</div>

					{/* Questions Review */}
					{questions.map((quizQuestion, index) => {
						const {
							question,
							optionA,
							optionB,
							optionC,
							optionD,
							userAnswer,
							correctAnswer,
						} = quizQuestion;
						const isCorrect = userAnswer === correctAnswer;

						return (
							<div
								key={question}
								className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all duration-200 hover:shadow-xl"
							>
								{/* Question Header */}
								<div className="flex items-start mb-6">
									<span className="flex items-center justify-center bg-blue-100 text-blue-600 rounded-full w-8 h-8 font-bold text-sm mr-4 flex-shrink-0">
										{index + 1}
									</span>
									<div className="flex-grow">
										<div className="flex items-center justify-between">
											<h2 className="text-xl font-medium text-gray-800">
												{question}
											</h2>
											{isCorrect ? (
												<CircleCheck className="w-6 h-6 text-green-500 ml-4 flex-shrink-0" />
											) : (
												<XCircle className="w-6 h-6 text-red-500 ml-4 flex-shrink-0" />
											)}
										</div>
									</div>
								</div>

								{/* Options */}
								<div className="space-y-3">
									{[
										{ label: "A", option: optionA },
										{ label: "B", option: optionB },
										{ label: "C", option: optionC },
										{ label: "D", option: optionD },
									].map(({ label, option }) => {
										const isUserAnswer = option === userAnswer;
										const isCorrectAnswer = option === correctAnswer;

										return (
											<div key={label} className="w-full">
												<div
													className={`flex items-center p-4 rounded-lg transition-all duration-200
                        ${
													isUserAnswer && isCorrect
														? "bg-green-100 border-2 border-green-500"
														: isUserAnswer && !isCorrect
														? "bg-red-100 border-2 border-red-500"
														: isCorrectAnswer
														? "bg-green-100 border-2 border-green-500"
														: "bg-gray-50 border-2 border-transparent"
												}`}
												>
													<span
														className={`flex items-center justify-center w-8 h-8 rounded-full mr-4
                          ${
														isUserAnswer && isCorrect
															? "bg-green-500 text-white"
															: isUserAnswer && !isCorrect
															? "bg-red-500 text-white"
															: isCorrectAnswer
															? "bg-green-500 text-white"
															: "bg-gray-200 text-gray-700"
													}`}
													>
														{label}
													</span>
													<span className="text-lg font-medium">{option}</span>
													{isCorrectAnswer && !isUserAnswer && (
														<Target className="ml-auto text-green-500 w-5 h-5" />
													)}
												</div>
											</div>
										);
									})}
								</div>

								{/* Explanation (if you have it in your data) */}
								{!isCorrect && (
									<div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
										<p className="text-sm text-blue-800">
											<strong>Correct Answer:</strong> The right answer was
											option with "{correctAnswer}".
											{userAnswer
												? ` You selected "${userAnswer}".`
												: " You didn't select an answer."}
										</p>
									</div>
								)}
							</div>
						);
					})}

					{/* Retry Button */}
					{/* <div className="text-center mt-8">
					<button
						onClick={() => window.location.reload()}
						className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
					>
						Try Again
					</button>
				</div> */}
				</div>
			</div>
		</>
	);
};

export default QuizAnswers;
