import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ role }) => {
    const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        // Not logged in → redirect to login and replace history
        return <Navigate to="/login" replace />;
    }

    if (role && currentUser.role !== role) {
        // Role mismatch → redirect to correct dashboard and replace history
        return currentUser.role === "manager" ? (
            <Navigate to="/manager-dashboard" replace />
        ) : (
            <Navigate to="/employee-dashboard" replace />
        );
    }

    // User is authenticated and has correct role → render nested route
    return <Outlet />;
};

export default PrivateRoute;
