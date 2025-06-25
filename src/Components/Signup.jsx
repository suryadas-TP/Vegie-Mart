import React, { useState } from 'react';
import Navbar from './Navbar';
import image1 from '../assets/Images/homebg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setCartItems } from '../redux/cartSlice';

const Signup = () => {
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendData = (e) => {
    e.preventDefault();
    axios
      .post('https://vegie-mart.onrender.com/user/signup', data)
      .then((response) => {
        const token = response.data.token;
        const user = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        dispatch(setUser({ user }));
        dispatch(setCartItems([]));
        navigate('/profile');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen relative text-white">
      <Navbar />

      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${image1})`,
          filter: 'brightness(0.4)',
        }}
      ></div>

      {/* Blurred glowing effects */}
      <div className="absolute w-96 h-96 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-20 -left-20 z-0"></div>
      <div className="absolute w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-40 right-10 z-0"></div>

      {/* Signup Form */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-emerald-600">
          <h2 className="text-4xl font-extrabold text-center text-emerald-300 mb-8">
            Create Account
          </h2>

          <form onSubmit={sendData} className="space-y-6">
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold text-slate-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="userName"
                required
                onChange={getValue}
                placeholder="Your full name"
                className="w-full px-5 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={getValue}
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  onChange={getValue}
                  placeholder="Create a password"
                  className="w-full px-5 py-3 pr-12 rounded-xl bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-600 hover:to-emerald-700 transition text-white text-lg font-bold shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:underline font-medium">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
