import { useEffect, useRef, useState } from 'react';
import './SignIn.css'
import { useNavigate } from 'react-router';

export default function SignIn() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const signInUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email !== "" && password !== "") {
            sessionStorage.setItem('signin', JSON.stringify({ email: email, password: password }))
            navigate("/movie", { replace: true });
        }
    }
    useEffect(() => {
        const str = sessionStorage.getItem('signin');
        const res = str ? JSON.parse(str) : {};
        setUser(res)
    }, [])
    if (user.email && user.password) {
        console.log(user.email)
        console.log(user.password)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input placeholder='enter the email...' ref={emailRef} type="text" />
                <label htmlFor="password">Password:</label>
                <input placeholder='enter the paaword...' ref={passwordRef} type="password" />
                <button onClick={() => signInUser()}>Submit</button>
                <h1>{user.email}</h1>
                <h1>{user.password}</h1>
            </div>
        </div>
    )
}
