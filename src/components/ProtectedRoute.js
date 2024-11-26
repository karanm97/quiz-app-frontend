import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { addUserData } from "../utils/slices/userSlice";

const ProtectedRoute = ({ redirectRoute, children }) => {
	const [validity, setValidity] = useState(null);
	const dispatch = useDispatch();

	const verifyToken = async (token) => {
		const response = await fetch("http://localhost:3000/api/verify-token", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		if (data.valid) {
			dispatch(
				addUserData({
					email: data.user.email,
					token: data.user.token,
				})
			);
			setValidity(true);
		} else {
			setValidity(false);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("user_token");
		if (token) {
			verifyToken(token);
		} else {
			setValidity(false);
		}
	}, []);

	if (validity === null) {
		return <h1>Verifying...</h1>;
	}

	if (!validity) {
		return <Navigate to={redirectRoute} />;
	}

	if (validity) {
		return children;
	}
};

export default ProtectedRoute;
