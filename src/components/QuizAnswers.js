import React from "react";
import { useSelector } from "react-redux";
import { CircleCheck, XCircle } from "lucide-react";

const QuizAnswers = () => {
	const questions = useSelector((store) => store.questions);
	let correctCount = 0;
	questions.map((question) => {
		if (question.userAnswer === question.correctAnswer) {
			correctCount += 1;
		}
	});

	return (
		<>
			<div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
				<h1 className="text-3xl text-green-600 font-semibold text-center mb-8">
					{correctCount + "/10"}
				</h1>
				<h1 className="text-3xl text-red-600 font-semibold text-center mb-8">
					Results
				</h1>

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
					let isCorrect = false;
					if (userAnswer === correctAnswer) {
						isCorrect = true;
						correctCount += 1;
					}
					return (
						<div
							key={question}
							className="bg-white p-6 mb-6 rounded-lg shadow-md"
						>
							{/* Question Text */}
							<div className="text-xl font-medium text-gray-800 mb-4 flex align-middle items-center">
								<span>{"Q." + (index + 1) + " " + question}</span>
								<span className="ml-2 inline-block">
									{isCorrect ? (
										<CircleCheck className="text-green-500" />
									) : (
										<XCircle className="text-red-500" />
									)}
								</span>
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
										<div
											className={`text-left w-11/12 px-2 py-3 text-lg font-semibold rounded-md focus:outline-none bg-gray-200 border-2 border-transparent
										${option === userAnswer && isCorrect && "bg-green-400"}
										${option === userAnswer && !isCorrect && "bg-yellow-700"}
										${option === correctAnswer && !isCorrect && "bg-green-400"}
									`}
											data-question={index}
											data-option={optionNo}
										>
											{option}
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default QuizAnswers;
