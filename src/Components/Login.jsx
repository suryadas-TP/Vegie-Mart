import React, { useState } from 'react'
import Navbar from './Navbar'
import image1 from '../assets/Images/homebg.jpg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../redux/userSlice'

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  function handleChange(event) {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function display() {
    console.log(data);

    axios.post("http://localhost:3000/login", data)
      .then((res) => {
        console.log('Login response:', res.data);


        dispatch(setUser({
          _id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
          token: res.data.token,
        }));

        navigate('/profile');
      })
      .catch((err) => {
        console.error('Login error:', err);
        alert('Invalid email or password');
      });
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center min-h-screen bg-cover' style={{ backgroundImage: `url(${image1})` }}>
        <div class="bg-transparent p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur-2xl">
          <h2 class="text-2xl font-bold text-center mb-6">Log In</h2>

          <form id="signupForm" class="space-y-4 " onSubmit={display}>


            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" required name='email'
                class="mt-1 w-full px-4 py-2 border rounded-md" onChange={handleChange} />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" required name='password'
                class="mt-1 w-full px-4 py-2 border rounded-md" onChange={handleChange} />
            </div>

            <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={display}>
              Log In
            </button>
          </form>
          <p id="message" class="mt-4 text-center text-sm"></p>
        </div>
      </div>
    </div>
  )
}

export default Login
