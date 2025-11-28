// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); // clear logged-in user
        navigate("/"); // redirect to sign in
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Product Manager</h2>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/addproduct">Add Product</Link>
                </li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
