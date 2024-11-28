import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTopicsToState } from "../utils/slices/topicsSlice";
import { addQuestionsToState } from "../utils/slices/questionsSlice";
import { useNavigate } from "react-router";
import { Tag, Loader2, BookOpen, Check } from "lucide-react";

const apiUrl = process.env.NODE_API_URL;

const TopicSelection = ({ startQuiz }) => {
	const [tags, setTags] = useState();
	const [selectedTags, setSelectedTags] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchTopics = async () => {
		const token = localStorage.getItem("user_token");
		const topicsData = await fetch(`${apiUrl}/api/topics/select`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const topics = await topicsData.json();
		setTags(topics);
	};

	useEffect(() => {
		fetchTopics();
	}, []);

	const handleTagClick = (tagName) => {
		let newTags = [...selectedTags];
		if (newTags.includes(tagName)) {
			newTags = newTags.filter((tag) => tag !== tagName);
		} else {
			newTags.push(tagName);
		}
		setSelectedTags(newTags);
	};

	const handleStartClick = async () => {
		if (selectedTags.length === 0) return;

		setIsLoading(true);
		dispatch(addTopicsToState(selectedTags));

		try {
			const token = localStorage.getItem("user_token");
			const response = await fetch(`${apiUrl}/api/topics/select`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					selectedTags,
				}),
			});
			const responseJSON = await response.json();
			dispatch(addQuestionsToState(responseJSON));
			startQuiz();
		} catch (error) {
			console.error("Error fetching questions:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (!tags) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header Card */}
				<div className="bg-white rounded-xl shadow-lg p-8 mb-8">
					<div className="text-center">
						<BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Select Your Topics
						</h1>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Choose the topics you'd like to be tested on. You can select
							multiple topics to customize your quiz experience.
						</p>
					</div>
				</div>

				{/* Topics Selection Card */}
				<div className="bg-white rounded-xl shadow-lg p-6">
					{/* Selected Topics Count */}
					<div className="mb-6 flex items-center justify-between px-4">
						<div className="flex items-center text-gray-600">
							<Tag className="w-5 h-5 mr-2" />
							<span>{selectedTags.length} topics selected</span>
						</div>
						{selectedTags.length > 0 && (
							<button
								onClick={() => setSelectedTags([])}
								className="text-sm text-gray-500 hover:text-gray-700"
							>
								Clear all
							</button>
						)}
					</div>

					{/* Topics Grid */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
						{tags.map((tag) => {
							const isSelected = selectedTags.includes(
								tag.topicName.toString()
							);
							return (
								<button
									key={tag._id}
									onClick={() => handleTagClick(tag.topicName.toString())}
									className={`group relative p-4 rounded-lg transition-all duration-200 border-2
                    ${
											isSelected
												? "bg-blue-50 border-blue-500 shadow-md"
												: "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
										}
                  `}
								>
									<div className="flex items-center justify-between">
										<span
											className={`font-medium ${
												isSelected ? "text-blue-700" : "text-gray-700"
											}`}
										>
											{tag.topicName}
										</span>
										{isSelected && <Check className="w-5 h-5 text-blue-500" />}
									</div>
								</button>
							);
						})}
					</div>

					{/* Start Button */}
					<div className="mt-8 text-center">
						<button
							onClick={handleStartClick}
							disabled={selectedTags.length === 0 || isLoading}
							className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 
                ${
									selectedTags.length > 0
										? "bg-blue-600 hover:bg-blue-700 text-white"
										: "bg-gray-200 text-gray-500 cursor-not-allowed"
								}
                flex items-center justify-center space-x-2 mx-auto
              `}
						>
							{isLoading ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									<span>Loading Quiz...</span>
								</>
							) : (
								<>
									<span>Start Quiz</span>
									{selectedTags.length === 0 && (
										<span className="text-sm">(Select topics first)</span>
									)}
								</>
							)}
						</button>
					</div>
				</div>

				{/* Help Text */}
				{selectedTags.length > 0 && (
					<div className="mt-6 text-center text-gray-600">
						Click Start Quiz to begin your test on{" "}
						{selectedTags.length === 1
							? selectedTags[0]
							: `${selectedTags.length} selected topics`}
					</div>
				)}
			</div>
		</div>
	);
};

export default TopicSelection;
