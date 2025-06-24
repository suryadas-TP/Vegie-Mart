import React, { useState } from 'react';
import Navbar from './Navbar';
import image1 from '../assets/Images/homebg.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { setCartItems } from '../redux/cartSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", data);
      const { token, user } = res.data;

      // Store token and user
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);

      dispatch(setUser({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          
        },
        token,
      }));

      // Fetch user's cart using token
      const cartRes = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setCartItems(cartRes.data.items || []));

      navigate('/profile');
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/30">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-md">Welcome Back</h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/70 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-700 hover:text-blue-900"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-2 rounded-lg shadow-md"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white/80">
            Don’t have an account?{' '}
            <Link to="/signup" className="underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
