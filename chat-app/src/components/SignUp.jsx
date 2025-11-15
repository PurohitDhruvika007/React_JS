import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../slices/userSlice';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user)
    return (
        <div>
            <h1>Sign Up page</h1>
            <input type="text" placeholder='enter the email..' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='enter the password..' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => dispatch(signUp({ email, password }))}>Sign Up</button>
        </div>
    )
}
