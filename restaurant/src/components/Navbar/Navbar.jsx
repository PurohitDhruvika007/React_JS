import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSlice";
import "./Navbar.css";

export default function Navbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar-vertical">
            {/* Logo Section */}
            <div className="nav-logo">
                <div className="logo-img-circle">
                    <img
                        src="https://cdn5.f-cdn.com/contestentries/1510474/33623865/5cf041ec517d5_thumb900.jpg"
                        alt="Signature Logo"
                        className="logo-img"
                    />
                </div>
                <h1 className="brand-name">Signature</h1>
                <p className="brand-tagline">Where Taste Becomes Art</p>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
                <Link
                    to="/employee-dashboard"
                    className={`nav-link ${isActive("/employee-dashboard") ? "active" : ""}`}
                >
                    <span className="nav-icon">🏠</span>
                    <span className="nav-text">Dashboard</span>
                </Link>

                <Link
                    to="/employee-dashboard/menu"
                    className={`nav-link ${isActive("/employee-dashboard/menu") ? "active" : ""}`}
                >
                    <span className="nav-icon">📋</span>
                    <span className="nav-text">Menu</span>
                </Link>

                <Link
                    to="/employee-dashboard/order"
                    className={`nav-link ${isActive("/employee-dashboard/order") ? "active" : ""}`}
                >
                    <span className="nav-icon">🧾</span>
                    <span className="nav-text">Orders</span>
                </Link>

                <Link
                    to="/employee-dashboard/profile"
                    className={`nav-link ${isActive("/employee-dashboard/profile") ? "active" : ""}`}
                >
                    <span className="nav-icon">👤</span>
                    <span className="nav-text">Profile</span>
                </Link>
            </div>

            {/* Logout Section */}
            <div className="nav-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <span className="nav-icon">🚪</span>
                    <span className="nav-text">Logout</span>
                </button>
            </div>
        </nav>
    );
}