import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Front.css";

export default function Front() {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="frontpage">
            {/* Background with gradient overlay */}
            <div className="background-container"></div>

            {/* Animated background elements */}
            <div className="animated-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
                <div className="bg-shape shape-4"></div>
            </div>

            {/* Main content container */}
            <div className={`main-container ${isLoaded ? 'loaded' : ''}`}>

                {/* Logo Section */}
                <div className="logo-section">
                    <div className="logo-wrapper">
                        <div className="logo-outer-ring">
                            <div className="logo-circle">
                                <img
                                    src="https://cdn5.f-cdn.com/contestentries/1510474/33623865/5cf041ec517d5_thumb900.jpg"
                                    alt="Signature Logo"
                                    className="logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="content-section">
                    <h1 className="title">
                        <span className="title-main">Signature</span>
                        <span className="title-glow"></span>
                    </h1>
                    <p className="tagline">Where Taste Becomes Art</p>
                    <div className="divider-line"></div>
                    <p className="description">
                        An exquisite culinary journey awaits. Experience perfection in every bite.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="cta-section">
                    <button className="enter-btn" onClick={() => navigate("/login")}>
                        <span className="btn-text">Enter Signature</span>
                        <span className="btn-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                </div>

                {/* Bottom Info Bar */}
                <div className="info-bar">
                    <div className="info-item">
                        <span className="info-label">Hours</span>
                        <span className="info-value">6PM - 11PM</span>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <span className="info-label">Location</span>
                        <span className="info-value">Gourmet District</span>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <span className="info-label">Reservations</span>
                        <span className="info-value">(555) 123-4567</span>
                    </div>
                </div>
            </div>
        </div>
    );
}