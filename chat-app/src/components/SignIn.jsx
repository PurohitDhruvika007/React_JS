import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, signIn, signInWithGoogle } from '../slices/userSlice.js'
export default function SignIn() {
  useEffect(() => {
    dispatch(fetchUser())
  }, []);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { users } = useSelector((state) => state.user)
  return (
    <div>
      <h1>sign in page</h1>
      {
        Array.isArray(users) && users.map((user, id) => (
          <h2 key={id}>{user.email}</h2>
        ))
      }
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email..' />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password..' />
      <button onClick={() => dispatch(signIn({ email, password }))}>Sign In</button>
      <button onClick={() => { dispatch(signInWithGoogle()); dispatch(fetchUser()) }}>Sign In with google</button>
    </div>
  )
}
