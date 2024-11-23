import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTopicsToState } from "../utils/slices/topicsSlice";
import { addQuestionsToState } from "../utils/slices/questionsSlice";
import { useNavigate } from "react-router";

const TopicSelection = ({ startQuiz }) => {
	const naviate = useNavigate();
	const { userEmail } = useSelector((store) => store.user);
	if (!userEmail) {
		naviate("/");
	}
	const [tags, setTags] = useState();
	const [selectedTags, setSelectedTags] = useState([]);
	const dispatch = useDispatch();

	const fetchTopics = async () => {
		const topicsData = await fetch("http://localhost:3000/api/topics/select");
		const topics = await topicsData.json();
		setTags(topics);
	};

	useEffect(() => {
		fetchTopics();
	}, []);

	const handleTagClick = (e) => {
		const tagName = e.target.innerText;
		let newTags = [...selectedTags];
		if (newTags.includes(tagName)) {
			newTags = newTags.filter((tag) => tag !== tagName);
		} else {
			newTags.push(tagName);
		}
		setSelectedTags(newTags);
	};

	const handleStartClick = async () => {
		dispatch(addTopicsToState(selectedTags));
		const response = await fetch("http://localhost:3000/api/topics/select", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				selectedTags,
			}),
		});
		const responseJSON = await response.json();
		dispatch(addQuestionsToState(responseJSON));
		startQuiz();
	};

	if (!tags) return null;

	return (
		<div className="flex flex-col justify-center items-center m-6">
			<div className="p-4 md:w-8/12 border-gray-400 shadow-2xl border-2 rounded-2xl">
				<div className="text-2xl font-semibold mb-4 flex items-center justify-center">
					Select Topics
				</div>
				<div className="flex flex-wrap justify-evenly gap-3">
					{tags.map((tag) => {
						const isSelected = selectedTags.includes(tag.topicName.toString());
						return (
							<div
								key={tag._id}
								className={`px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 border-2 shadow-md hover:shadow-lg
                                ${
																	isSelected
																		? "bg-blue-500 text-white border-blue-500"
																		: "bg-gray-100 hover:bg-gray-200 border-gray-300"
																} 
                            `}
								onClick={handleTagClick}
							>
								{tag.topicName}
							</div>
						);
					})}
				</div>
				<div className="flex items-center justify-center ">
					<div
						className="mt-8 mb-2 py-2 px-8 rounded-md cursor-pointer hover:bg-red-600 hover:text-white border-2 border-red-500"
						onClick={handleStartClick}
					>
						Start
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopicSelection;
