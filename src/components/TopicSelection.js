import React, { useState } from "react";

const TAGS = [
	{ id: 0, value: "Science" },
	{ id: 1, value: "Maths" },
	{ id: 2, value: "Philosophy" },
	{ id: 3, value: "Sports" },
	{ id: 4, value: "History" },
	{ id: 5, value: "General Knowledge" },
	{ id: 6, value: "Pop Culture" },
];

const TopicSelection = () => {
	const [selectedTags, setSelectedTags] = useState([]);

	const handleTagClick = (e) => {
		const tagId = e.target.dataset.id;
		let tags = [...selectedTags];
		if (tags.includes(tagId)) {
			tags = tags.filter((tag) => tag !== tagId);
		} else {
			tags.push(tagId);
		}
		setSelectedTags(tags);
	};

	const handleStartClick = () => {
		console.log(selectedTags);
	};

	return (
		<div className="flex flex-col justify-center items-center m-6">
			<div className="p-4 md:w-8/12 border-gray-400 shadow-2xl border-2 rounded-2xl">
				<div className="text-2xl font-semibold mb-4 flex items-center justify-center">
					Select Topics
				</div>
				<div className="flex flex-wrap justify-evenly gap-3">
					{TAGS.map((tag) => {
						const isSelected = selectedTags.includes(tag.id.toString());
						return (
							<div
								key={tag.id}
								className={`px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 border-2 shadow-md hover:shadow-lg
                                ${
																	isSelected
																		? "bg-blue-500 text-white border-blue-500"
																		: "bg-gray-100 hover:bg-gray-200 border-gray-300"
																} 
                            `}
								onClick={handleTagClick}
								data-id={tag.id}
							>
								{tag.value}
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
