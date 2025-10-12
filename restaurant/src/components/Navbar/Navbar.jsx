import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSlice";

export default function Navbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname.includes(path);

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
            <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
                <Link
                    to="/employee-dashboard"
                    style={{
                        color: isActive("/employee-dashboard") && !isActive("/order") && !isActive("/profile") && !isActive("/dashboard")
                            ? "#ffe082"
                            : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "18px",
                    }}
                >
                    Menu
                </Link>

                <Link
                    to="/employee-dashboard/order"
                    style={{
                        color: isActive("/order") ? "#ffe082" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "18px",
                    }}
                >
                    Orders
                </Link>

                <Link
                    to="/employee-dashboard/profile"
                    style={{
                        color: isActive("/profile") ? "#ffe082" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "18px",
                    }}
                >
                    Profile
                </Link>

                <Link
                    to="/employee-dashboard/dashboard"
                    style={{
                        color: isActive("/dashboard") ? "#ffe082" : "#fff",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "18px",
                    }}
                >
                    Dashboard
                </Link>

                {/* Logout Button */}
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
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
