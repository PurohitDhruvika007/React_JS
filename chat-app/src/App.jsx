import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import { Route, Routes } from 'react-router'
import ChatPage from './components/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  )
}

export default App
