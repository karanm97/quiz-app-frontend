import React, { useState } from "react";
import Header from "./Header";
import { loginUser, registerUser } from "../api/authentication";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUserData } from "../utils/slices/userSlice";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSignUpClick = () => {
		setIsLogin((isLogin) => !isLogin);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// User Registration
		if (!isLogin && password === repeatPassword) {
			if (password.length < 8 || repeatPassword.length < 8) {
				setError("Password should be of atleast 8 characters.");
				return;
			}
			const responseData = await registerUser(email, password);
			if (responseData.status !== "ok") {
				setError(responseData.status);
			} else {
				localStorage.setItem("user_token", responseData.token);
				dispatch(
					addUserData({
						email,
						token: responseData.token,
					})
				);
				setError("");
				navigate("/quiz");
			}
		}
		if (!isLogin && password !== repeatPassword) {
			setError("Passwords do not match.");
		}

		// User Login
		if (isLogin) {
			const responseData = await loginUser(email, password);
			if (responseData.status === "ok" && responseData.user) {
				localStorage.setItem("user_token", responseData.token);
				dispatch(
					addUserData({
						email,
						token: responseData.token,
					})
				);
				navigate("/quiz");
			} else {
				setError("Email ID not found.");
			}
		}
	};

	return (
		<>
			<Header />
			<div className="min-h-screen flex justify-center items-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-96">
					<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
						{isLogin ? "Login" : "Sign up"}
					</h2>

					<form onSubmit={handleSubmit}>
						{/* Email Field */}
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-medium"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								placeholder="Enter your email"
							/>
						</div>

						{/* Password Field */}
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-gray-700 font-medium"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								placeholder="Enter your password"
							/>
						</div>

						{/* Repeat Password Field */}
						{!isLogin && (
							<div className="mb-6">
								<label
									htmlFor="password"
									className="block text-gray-700 font-medium"
								>
									Repeat Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
									className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
									placeholder="Enter your password"
								/>
							</div>
						)}

						{/* Error Message */}
						{error && (
							<div className="flex justify-center items-center">
								<div className="text-red-600 p-2">{error}</div>
							</div>
						)}
						{/* Submit Button */}
						<button
							type="submit"
							className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
						>
							{isLogin ? "Log In" : "Sign Up"}
						</button>
					</form>

					<div className="mt-4 text-center text-sm text-gray-600">
						{isLogin ? "Don't have an account? " : "Already have an account? "}
						<div
							className="inline text-blue-500 hover:underline cursor-pointer"
							onClick={handleSignUpClick}
						>
							{isLogin ? "Sign up" : "Sign in"}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
