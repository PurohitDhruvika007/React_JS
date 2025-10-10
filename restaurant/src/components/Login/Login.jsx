import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, clearError } from "../../slices/AuthSlice";
import "./Login.css";

export default function Login() {
    const [firstName, setFirstName] = useState(""); // username
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error, loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ firstName, password }));
    };

    useEffect(() => {
        if (currentUser) {
            const path =
                currentUser.role === "manager"
                    ? "/manager-dashboard"
                    : "/employee-dashboard";

            navigate(path, { replace: true }); // <-- must be here
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        return () => dispatch(clearError());
    }, [dispatch]);

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login to Green Delight</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
