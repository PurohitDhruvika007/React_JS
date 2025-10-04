
import { Route, Routes } from 'react-router'
import './App.css'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import PrivateRouting from './Components/PrivateRouting'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/home' element={<PrivateRouting>
          <Home />
        </PrivateRouting>} />
      </Routes>
    </>
  )
}

export default App
