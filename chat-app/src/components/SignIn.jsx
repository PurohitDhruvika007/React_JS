import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, signIn, signInWithGoogle } from '../slices/userSlice.js'
export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUser())
  }, []);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { users } = useSelector((state) => state.user)
  return (
    <div>
      <h1>sign in page</h1>
      {/* {
        Array.isArray(users) && users.map((user, id) => (
          <h2 key={id}>{user.email}</h2>
        ))
      } */}
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email..' />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password..' />
      <button
        onClick={async () => {
          try {
            // Wait for sign-in to complete
            await dispatch(signIn({ email, password })).unwrap();

            // If correct → navigate
            navigate("/home");

          } catch (error) {
            // If wrong → show error
            alert("Invalid email or password!");
            console.log(error);
          }
        }}
      >
        Sign In
      </button>

      <button
        onClick={async () => {
          try {
            await dispatch(signInWithGoogle()).unwrap();
            navigate("/home");
          } catch (error) {
            alert("Google sign-in failed!");
          }
        }}
      >
        Sign In with Google
      </button>

      <p>dont have an account ? <Link to="/signup">sign up</Link></p>
    </div>
  )
}
