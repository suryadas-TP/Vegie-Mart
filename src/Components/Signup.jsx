import React, { useState } from 'react'
import Navbar from './Navbar'
import image1 from '../assets/Images/homebg.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'



const Signup = () => {
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: ''
  });

const dispatch = useDispatch()

  function getValue(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

const navigate = useNavigate()

  function sendData(e) {
    e.preventDefault(); 
    axios.post('http://localhost:3000/user/signup', data)
      .then((response) => {
        console.log("*****************************",response.data);
        dispatch(setUser(response.data.data))
        
        navigate("/profile")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 flex flex-col">
      <Navbar />
      <div
        className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl max-w-md w-full p-10 shadow-2xl border border-white/30">
          <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-8 tracking-wide drop-shadow-md">
            Create Account
          </h2>

          <form onSubmit={sendData} className="space-y-6">
            <div>
              <label htmlFor="userName" className="block text-indigo-800 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                required
                onChange={getValue}
                className="w-full px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-indigo-800 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={getValue}
                className="w-full px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-indigo-800 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={getValue}
                className="w-full px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-indigo-900 font-medium">
            Already have an account?{' '}
            <Link to="/Login" className="text-indigo-600 hover:text-indigo-900 font-semibold underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
