import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((store) => store.user.userEmail);
	const topics = useSelector((store) => store.topics);

	return (
		<>
			<Header />
			{topics.length > 0 ? (
				<div className="bg-white rounded-xl p-6">
					<div className="mb-6 flex items-center justify-between px-4 text-2xl">
						{`Hi ${user}, you have selected the following topics -`}
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
						{topics.map((tag, index) => {
							return (
								<div
									key={index}
									className={`group relative p-4 rounded-lg transition-all duration-200 border-2`}
								>
									<div className="flex items-center justify-between">
										<span className={`font-medium`}>{tag}</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<div className="bg-white rounded-xl p-6">
					<div className="mb-6 flex items-center justify-between px-4 text-2xl">
						{`You have not selected any topics`}
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
