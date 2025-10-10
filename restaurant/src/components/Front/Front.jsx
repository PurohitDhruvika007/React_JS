import React from "react";
import { useNavigate } from "react-router";
import "./Front.css";

export default function Front() {
    const navigate = useNavigate();

    return (
        <div className="frontpage">
            <div className="overlay"></div>

            <div className="hero-card">
                <img
                    src="https://i.pinimg.com/1200x/0c/fb/d2/0cfbd25cd4b9ca2ff434a7780ac70baa.jpg"
                    alt="Veg Restaurant Logo"
                    className="logo"
                />
                <h1 className="title">Green Delight</h1>
                <p className="tagline">Pure Veg • Pure Taste • Pure Joy</p>
                <button className="start-btn" onClick={() => navigate("/login")}>
                    Start
                </button>
            </div>
        </div>
    );
}
