import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSlice";

export default function NavbarManager() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login"); // redirect to login page
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#2e8b57",
                color: "#fff",
                padding: "12px 30px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
        >
            {/* 🍃 Brand Name */}
            <h1 style={{ margin: 0, fontFamily: "cursive", fontSize: "26px" }}>
                🌿 Green Delight
            </h1>

            {/* 🔗 Navigation Links + Logout */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <Link
                    to="/manager-dashboard"
                    style={{
                        color: isActive("/manager-dashboard") ? "#ffd700" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                    }}
                >
                    Dashboard
                </Link>

                <Link
                    to="/manager-dashboard/employees"
                    style={{
                        color: isActive("/manager-dashboard/employees") ? "#ffd700" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                    }}
                >
                    Employees
                </Link>

                <Link
                    to="/manager-dashboard/menus"
                    style={{
                        color: isActive("/manager-dashboard/menus") ? "#ffd700" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                    }}
                >
                    Menus
                </Link>

                <Link
                    to="/manager-dashboard/orders"
                    style={{
                        color: isActive("/manager-dashboard/orders") ? "#ffd700" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                    }}
                >
                    Orders
                </Link>

                <Link
                    to="/manager-dashboard/profile"
                    style={{
                        color: isActive("/manager-dashboard/profile") ? "#ffd700" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                    }}
                >
                    Profile
                </Link>

                {/* 🚪 Logout Button */}
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                        marginLeft: "10px",
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
