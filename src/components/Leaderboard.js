import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState();
	const [errors, setErrors] = useState();
	const userEmail = useSelector((store) => store.user.userEmail);

	const fetchLeaderboardData = async () => {
		const response = await fetch("http://localhost:3000/api/leaderboard");
		const responseJSON = await response.json();
		if (responseJSON.error) {
			setErrors(responseJSON.error);
		} else {
			setLeaderboardData(responseJSON);
		}
	};

	useEffect(() => {
		fetchLeaderboardData();
	}, []);

	return (
		<>
			<Header />
			{errors && (
				<div className="container mx-auto p-4">
					<h1 className="text-3xl font-bold mb-4 text-center">
						This page is empty.
					</h1>
				</div>
			)}
			{leaderboardData && (
				<div className="container mx-auto p-4">
					<h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
					<table className="min-w-full table-auto border-collapse border border-gray-200">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-4 py-2 text-left border-b">Email</th>
								<th className="px-4 py-2 text-left border-b">Score</th>
							</tr>
						</thead>
						<tbody>
							{leaderboardData.map((entry, index) => (
								<tr
									key={index}
									className={`border-b ${
										userEmail === entry.email && "bg-blue-400"
									}`}
								>
									<td className={`px-4 py-2`}>{entry.email}</td>
									<td className="px-4 py-2">{entry.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default Leaderboard;
