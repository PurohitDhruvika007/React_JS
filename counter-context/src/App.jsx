
import './App.css'
import CounterProvider from './context/CounterProvider'
import Todoprovider from './context/Todoprovider'
import Home from './Pages/Home/Home'
import Todo from './Pages/Todo/Todo'
function App() {
  return (
    <>
      {/* <CounterProvider>
        <Home />
      </CounterProvider> */}
      <Todoprovider>
        <Todo />
      </Todoprovider>
    </>
  )
}

export default App
