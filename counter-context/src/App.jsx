
import './App.css'
import CounterProvider from './context/CounterProvider'
import Home from './Pages/Home/Home'

function App() {
  return (
    <>
      <CounterProvider>
        <Home />
      </CounterProvider>
    </>
  )
}

export default App
