import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../slices/userSlice';
import { useNavigate, Link } from 'react-router';
import './SignUp.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="signup-container">
            <div className="signup-card">

                <h1 className="signup-title">Create Account</h1>

                <div className="input-group">
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        className="signup-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="signup-btn"
                    onClick={async () => {
                        try {
                            await dispatch(signUp({ email, password })).unwrap();
                            navigate("/home");
                        } catch (error) {
                            alert("Sign up failed! (Email may already be registered)");
                            console.log(error);
                        }
                    }}
                >
                    Sign Up
                </button>

                <p className="signin-text">
                    Already have an account?{" "}
                    <Link className="signin-link" to="/">Sign In</Link>
                </p>

            </div>
        </div>
    );
}
