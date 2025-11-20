import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getuser } from "../../slices/userSlice";
import { useNavigate } from "react-router";
import "./Home.css";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(getuser());
    }, []);

    const { users, isLoading, currentUser } = useSelector((state) => state.user);

    return (
        <div className="home-page">

            {/* HEADER */}
            <div className="home-header">
                <h1 className="welcome-title">
                    Welcome, <span>{currentUser.email}</span>
                </h1>
                <p className="subtitle">Select a user to start chatting</p>
            </div>

            {/* USERS LIST */}
            {isLoading ? (
                <h2 className="loading">Loading users...</h2>
            ) : (
                <div className="users-grid">
                    {users.map((user, id) => {
                        if (currentUser.email !== user.email) {
                            return (
                                <div
                                    key={id}
                                    className="user-card"
                                    onClick={() => navigate("/chat", { state: user })}
                                >
                                    <div className="avatar">
                                        {user.email[0].toUpperCase()}
                                    </div>
                                    <h3 className="email-text">{user.email}</h3>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}
