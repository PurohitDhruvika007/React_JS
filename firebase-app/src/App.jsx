import { auth, provider, db } from './Auth.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import './App.css'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
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
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      alert("sign in with google successfully!!");
      const user = result.user;
      console.log(user.displayName);
      console.log(user.email);
      console.log(user.photoURL);
    }).catch((error) => error.message)
  }
  const handleAddData = async () => {
    const docRef = await addDoc(collection(db, "books"), {
      name: name,
      author: author,
      price: price
    });
    alert("data added successfully", docRef.name);
    setName("")
    setAuthor("")
    setPrice(0)
  }
  const handleReadData = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.docs.forEach((doc) => console.log(doc.data()));
  }

  return (
    <>
      <input type="text" placeholder='enter the email' onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder='enter the password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleSignUp()}>sign up</button>
      <button onClick={() => handleSignIn()}>sign in</button>
      <button onClick={() => handleSignInWithGoogle()}>sign in with google</button>
      <input type="text" placeholder='enter the name' onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder='enter the author' onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder='enter the price' onChange={(e) => setPrice(Number(e.target.value))} />

      <button onClick={() => handleAddData()}>add data</button>
      <button onClick={() => handleReadData()}>read all data</button>
    </>
  )
}

export default App
