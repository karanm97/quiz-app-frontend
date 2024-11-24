import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ isAuthenticated, redirectRoute, children }) => {
	if (!isAuthenticated) {
		return <Navigate to={redirectRoute} />;
	}
	return children;
};

export default ProtectedRoute;
