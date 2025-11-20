import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, signIn, signInWithGoogle } from '../../slices/userSlice.js';
import './SignIn.css';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin-container">
      <div className="signin-card">

        <h1 className="signin-title">Sign In</h1>

        <div className="input-group">
          <input
            type="text"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          className="signin-btn"
          onClick={async () => {
            try {
              await dispatch(signIn({ email, password })).unwrap();
              navigate("/home");
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
              navigate("/home");
            } catch (error) {
              alert("Google Sign-in Failed!");
              console.log(error);
            }
          }}
        >
          Continue with Google
        </button>

        <p className="signup-text">
          Don’t have an account? <Link className="signup-link" to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
