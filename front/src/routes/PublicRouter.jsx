import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const PublicRoute = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to="/news" replace />;
	}

	return <>{children}</>;
};
