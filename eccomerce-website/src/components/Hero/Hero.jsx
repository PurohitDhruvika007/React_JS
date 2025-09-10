import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router'

export default function Hero() {
    const navigate = useNavigate();
    return (
        <div className="hero">
            <div className="overlay"></div>
            <div className="hero-content">
                <h1>Elevate Your Style</h1>
                <p>Discover the latest fashion trends and exclusive collections.</p>
                <button className="cta-btn" onClick={(e) => {
                    e.preventDefault();
                    navigate('/productList');
                }}>Shop Now</button>
            </div>
        </div>
    );
}
