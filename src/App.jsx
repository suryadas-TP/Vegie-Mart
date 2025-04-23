import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Homenu from './Components/Homenu'
import Cart from './Components/Cart'
import Account from './Components/Account'
import Signup from './Components/Signup'
import Vegies from './Components/Vegies'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homenu/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/vegies' element={<Vegies/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
