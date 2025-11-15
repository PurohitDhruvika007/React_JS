import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../slices/userSlice';
import { useNavigate, Link } from 'react-router';
import SignIn from './SignIn';

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user)
    return (
        <div>
            <h1>Sign Up page</h1>
            <input type="text" placeholder='enter the email..' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='enter the password..' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
                onClick={async () => {
                    try {
                        await dispatch(signUp({ email, password })).unwrap();

                        // If sign up succeeded → navigate
                        navigate("/home");
                    } catch (error) {
                        alert("Sign up failed! (Email may already be registered)");
                        console.log(error);
                    }
                }}
            >
                Sign Up
            </button>

            <p>already have an account ? <Link to="/">sign in</Link></p>
        </div>
    )
}
