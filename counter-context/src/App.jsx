import React from 'react'
import CounterProvider from './context/CounterProvider'
import Home from './Pages/Home/Home'
import Todo from './Pages/Todo/Todo'
import './app.css'

export default function App() {
  return (
    <div>
      <CounterProvider>
        <Home />
        <Todo />
      </CounterProvider>
    </div>
  )
}
