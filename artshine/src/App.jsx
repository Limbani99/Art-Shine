import React from 'react'
import About from './Pages/User/About'
import Profile from './Pages/User/Profile'
import Contact from './Pages/User/Contact'
import Gallery from './Pages/User/Gallery'
import Home from './Pages/User/Home'
import Services from './Pages/User/Services'
import ProductDetails from './Pages/User/ProductDetails'
import Shop from './Pages/User/Shop'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './Pages/NotFound'
import Layout from './layout/Layout'
import { Routes, Route } from 'react-router-dom'
import Chat from './Pages/User/Chat'
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/chat" element={<Chat />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />

      </Routes>


    </>


  )
}

export default App