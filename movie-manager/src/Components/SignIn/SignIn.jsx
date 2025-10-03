import { useEffect, useRef, useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router';

export default function SignIn() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const signInUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email && password) {
            sessionStorage.setItem('signin', JSON.stringify({ email, password }));
            alert(email + " signed in successfully!");
            navigate("/movie", { replace: true });
        } else {
            alert("Fill in all fields!");
        }
    };

    useEffect(() => {
        const str = sessionStorage.getItem('signin');
        const res = str ? JSON.parse(str) : {};
        setUser(res);
    }, []);

    return (
        <div className="liquid-bg">
            <div className="liquid-card">
                <h1 className="liquid-title"> Sign In</h1>
                {user.email && <p className="liquid-welcome">Welcome back, <strong>{user.email}</strong>!</p>}
                <div className="liquid-input-group">
                    <input placeholder="Email" ref={emailRef} type="text" />
                </div>
                <div className="liquid-input-group">
                    <input placeholder="Password" ref={passwordRef} type="password" />
                </div>
                <button className="liquid-btn" onClick={signInUser}>sign In</button>
            </div>
        </div>
    );
}
