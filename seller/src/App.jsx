import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import Login from './auth/Login'
import ForgetPassword from './auth/ForgetPassword'
import ResetPassword from './auth/ResetPassword'
import Order from './Pages/Order'
import Products from './Pages/Products'
import Category from './Pages/Category'
import Customer from './Pages/Customer'
import AddProduct from './Pages/AddProduct'
import UpdateProduct from './Pages/UpdateProduct'
import AddCategory from './Pages/AddCategory'
import UpdateCategory from './Pages/UpdateCategory'
import Chat from './Pages/Chat'
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/products' element={<Products />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='/category' element={<Category />} />
        <Route path='/add-category' element={<AddCategory />} />
        <Route path='/update-category/:id' element={<UpdateCategory />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/chat' element={<Chat />} />
      </Route>
      <Route path="/seller/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  )
}

export default App