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
		<div className="flex justify-between px-4 py-2 bg-zinc-800 text-white">
			<div className="my-auto text-2xl font-extrabold ">QuizApp</div>
			<div className="">
				<span className="">{userEmail}</span>
				{userEmail && (
					<button
						className="ml-2 py-2 px-4 border-2 border-white hover:bg-gray-100 hover:text-black rounded-md"
						onClick={handleLogoutClick}
					>
						Logout
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;
