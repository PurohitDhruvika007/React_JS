
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Product_list from './components/Products_list/Product_list'
import Add_to_cart from './components/Add_to_cart/Add_to_cart'
import Product_detail from './components/Products_detail/Product_detail'
import { useEffect, useState } from 'react'

function App() {
  const [cartsList, setCartsList] = useState([]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartsList))
  }, [cartsList])

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/ProductList' element={<Product_list />} />
        <Route path='/ProductDetails' element={<Product_detail setCarts={setCartsList} />} />
        <Route path='/AddToCart' element={<Add_to_cart cart={cartsList} setCarts={setCartsList} />} />

        <Route path='/Home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
