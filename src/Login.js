import React, { useState } from "react";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassowrd, setRepeatPassword] = useState("");

	const handleSignUpClick = () => {
		setIsLogin((isLogin) => !isLogin);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
		!isLogin && console.log("Repeat Password:", repeatPassowrd);
		// You can add form validation or API calls here
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
					{isLogin ? "Login" : "Sign up"}
				</h2>

				<form onSubmit={handleSubmit}>
					{/* Email Field */}
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700 font-medium">
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
								value={repeatPassowrd}
								onChange={(e) => setRepeatPassword(e.target.value)}
								className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								placeholder="Enter your password"
							/>
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
					>
						Log In
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					{isLogin ? "Don't have an account? " : "Already have an account? "}
					<div
						className="inline text-blue-500 hover:underline cursor-pointer"
						onClick={handleSignUpClick}
					>
						{isLogin ? "Sign up" : "Sign in"}
					</div>
				</p>
			</div>
		</div>
	);
};

export default Login;
