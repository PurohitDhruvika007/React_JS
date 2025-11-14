import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../slices/userSlice.js'
export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { users } = useSelector((state) => state.user)
  return (
    <div>
      {
        users.map((user, id) => <h2 key={id}>
          {user.email}
        </h2>)
      }
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email..' />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password..' />
      <button onClick={() => dispatch(signIn({ email, password }))}>Sign In</button>
    </div>
  )
}
