import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserEmail } from "../utils/slices/userSlice";

const Header = () => {
	const dispatch = useDispatch();
	const userEmail = useSelector((store) => store.user.userEmail);

	const handleLogoutClick = () => {
		dispatch(removeUserEmail());
	};

	return (
		<div className="flex justify-between p-2 m-2">
			<div className="my-auto">QuizApp</div>
			<div className="">
				<span className="">{userEmail}</span>
				<button
					className="ml-2 py-2 px-4 bg-red-400 hover:bg-red-600 rounded-md"
					onClick={handleLogoutClick}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Header;
