import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ userEmail, userToken, redirectRoute, children }) => {
	if (!(userEmail || userToken)) {
		return <Navigate to={redirectRoute} />;
	}
	return children;
};

export default ProtectedRoute;
