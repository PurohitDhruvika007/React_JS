import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router'

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home', { replace: true });
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login Page</h1>
            <form className="login-form" onSubmit={handleSubmit}>


                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-input" placeholder="Enter the email.." required />

                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" className="form-input" placeholder="Enter the password.." required />

                <div className="form-options">
                    <div className="remember-me">
                        <input type="checkbox" />
                        <p>Remember me</p>
                    </div>
                    <div className="forgot-password">
                        <a href="#">Forget password ?</a>
                    </div>
                </div>

                <button type="submit" className="login-btn">Login In</button>

                <button type="button" className="google-btn">
                    <a href="https://accounts.google.com/signin/v2/identifier?service=accountsettings">
                        Sign in with Google
                    </a>
                </button>

                <p className="signup-text">Don't have an account? <span>Sign up</span></p>
            </form>
        </div>
    );
}
