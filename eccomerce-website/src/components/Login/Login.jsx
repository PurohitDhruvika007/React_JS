import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router';

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home', { replace: true });
    };

    return (
        <div className="login-wrapper">
            <div className="bg-particles"></div>

            <form className="login-card" onSubmit={handleSubmit}>
                <h1 className="login-heading">Welcome Back</h1>

                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="Enter your email" required />

                <label className="form-label">Password</label>
                <input type="password" className="form-input" placeholder="Enter your password" required />

                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" className="btn neon-btn">Login</button>

                <button type="button" className="btn google-btn">
                    <a href="https://accounts.google.com/signin/v2/identifier?service=accountsettings">
                        Sign in with Google
                    </a>
                </button>

                <p className="signup-text">Don’t have an account? <span>Sign up</span></p>
            </form>
        </div>
    );
}
