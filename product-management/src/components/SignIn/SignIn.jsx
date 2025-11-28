import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser, signIn, signInWithGoogle } from "../../slices/userSlice.js";
import "./SignIn.css";
import Navbar from "../Navbar/Navbar";

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="signin-page">

            <div className="signin-container">
                <div className="signin-card">

                    <h1 className="signin-title">Sign In</h1>

                    <div className="input-group">
                        <input
                            type="email"
                            className="signin-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            className="signin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        className="signin-btn"
                        onClick={async () => {
                            try {
                                await dispatch(signIn({ email, password })).unwrap();
                                navigate("/home", { replace: true });
                            } catch (error) {
                                alert("Invalid email or password!");
                                console.log(error);
                            }
                        }}
                    >
                        Sign In
                    </button>

                    <button
                        className="google-btn"
                        onClick={async () => {
                            try {
                                await dispatch(signInWithGoogle()).unwrap();
                                navigate("/home", { replace: true });
                            } catch (error) {
                                alert("Google Sign-in Failed!");
                                console.log(error);
                            }
                        }}
                    >
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
