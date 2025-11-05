import { auth } from './Auth.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './App.css'
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      alert(userCredential.user);

    }).catch((error) => alert(error.message))
  }
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(userCredential.user);

      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <input type="text" placeholder='enter the email' onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder='enter the password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleSignUp()}>sign up</button>
      <button onClick={() => handleSignIn()}>sign in</button>
    </>
  )
}

export default App
