import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../utils/slices/userSlice";
import { NavLink } from "react-router-dom";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const userEmail = useSelector((store) => store.user.userEmail);

	const handleLogoutClick = () => {
		localStorage.removeItem("user_token");
		dispatch(removeUserData());
	};
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="bg-gray-800 text-white p-4">
			<div className="flex justify-between items-center">
				<NavLink to={"/quiz"} className="text-2xl font-bold">
					QUIZAPP
				</NavLink>

				<nav
					className={`md:flex md:items-center md:align-middle md:justify-center md:space-x-6 space-y-4 md:space-y-0 ${
						isMenuOpen ? "block" : "hidden"
					} md:block`}
				>
					<ul className="flex flex-col md:flex-row gap-2">
						<li>
							<NavLink to={"/quiz"} className="hover:text-gray-400">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to={"/leaderboard"} className="hover:text-gray-400">
								Leaderboard
							</NavLink>
						</li>
						<li>
							<NavLink to={"/profile"} className="hover:text-gray-400">
								{userEmail}
							</NavLink>
						</li>
					</ul>
					{userEmail && (
						<button
							className="px-4 py-2 border-2 border-white hover:bg-gray-100 hover:text-black rounded-md"
							onClick={handleLogoutClick}
						>
							Logout
						</button>
					)}
				</nav>

				<div
					className="md:hidden flex flex-col space-y-2 cursor-pointer"
					onClick={toggleMenu}
				>
					<div className="w-6 h-0.5 bg-white"></div>
					<div className="w-6 h-0.5 bg-white"></div>
					<div className="w-6 h-0.5 bg-white"></div>
				</div>
			</div>
		</header>
	);
};

export default Header;
