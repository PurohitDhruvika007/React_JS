import { useRef } from "react";
import { useNavigate } from "react-router";

export default function SignIn() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const SigninForm = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const user = { email: email, password: password };

        localStorage.setItem("user", JSON.stringify(user))
        const auth = JSON.parse(localStorage.getItem('user') ?? "{}")
        if (auth.email && auth.password) {
            navigate('/home', { replace: true })
        }
        else {
            alert("please first sign in..")
        }
    }
    return (
        <div>
            <h1>Sign in</h1>
            <input type="text" placeholder='Enter the email..' ref={emailRef} />
            <input type="text" placeholder='Enter the password..' ref={passwordRef} />
            <button onClick={() => SigninForm()}>Sign in</button>
        </div>
    )
}
