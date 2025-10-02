import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import SignIn from './Components/SignIn/SignIn'
import Movie from './Components/Movie/Movie'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </>
  )
}

export default App
