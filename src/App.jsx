import React, { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Homenu from './Components/Homenu'
import Cart from './Components/Cart'
import Signup from './Components/Signup'
import Vegies from './Components/Vegies'
import Login from './Components/Login'
import UploadImage from './Components/UploadImage'
import UserProfile from './Components/UserProfile'
import Payment from './Components/Payment'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import OrderPlaced from './Components/OrderPlaced'

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homenu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/vegies' element={<Vegies />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/upload' element={<UploadImage />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='payment' element={<Payment />} />
          <Route path='/order-placed' element={<OrderPlaced />} />
        </Routes>
        <ToastContainer position='top-center' autoClose={2000} />
      </BrowserRouter>
    </div>
  )
}

export default App
