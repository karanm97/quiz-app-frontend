import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { addUserData } from "../utils/slices/userSlice";

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState();
	const [errors, setErrors] = useState();
	const dispatch = useDispatch();
	const userEmail = useSelector((store) => store.user.userEmail);

	const apiRouter = () => {
		const token = localStorage.getItem("user_token");

		if (token === null || token === undefined) {
			fetchLeaderboardDataWithoutToken();
		} else {
			fetchLeaderboardDataWithToken();
		}
	};

	const fetchLeaderboardDataWithoutToken = async () => {
		const response = await fetch("http://localhost:3000/api/leaderboard");
		const responseJSON = await response.json();

		if (responseJSON.error) {
			setErrors(responseJSON.error);
		} else {
			setLeaderboardData(responseJSON);
		}
	};

	const fetchLeaderboardDataWithToken = async () => {
		const token = localStorage.getItem("user_token");

		const response = await fetch(
			"http://localhost:3000/api/leaderboard-token",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseJSON = await response.json();

		if (responseJSON.error) {
			setErrors(responseJSON.error);
		} else {
			setLeaderboardData(responseJSON.data);
			dispatch(
				addUserData({
					email: responseJSON.email,
					token: responseJSON.token,
				})
			);
		}
	};

	useEffect(() => {
		apiRouter();
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
