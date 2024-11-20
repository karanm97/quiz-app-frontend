import React from "react";

const Leaderboard = () => {
	const data = [
		{ rank: 1, email: "user1@example.com", score: 1200 },
		{ rank: 2, email: "user2@example.com", score: 1150 },
		{ rank: 3, email: "user3@example.com", score: 1100 },
		{ rank: 4, email: "user4@example.com", score: 1050 },
		{ rank: 5, email: "user5@example.com", score: 1000 },
	];

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
			<table className="min-w-full table-auto border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-100">
						<th className="px-4 py-2 text-left border-b">Rank</th>
						<th className="px-4 py-2 text-left border-b">Email</th>
						<th className="px-4 py-2 text-left border-b">Score</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.rank} className="border-b hover:bg-gray-50">
							<td className="px-4 py-2">{item.rank}</td>
							<td className="px-4 py-2">{item.email}</td>
							<td className="px-4 py-2">{item.score}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;
