import React from 'react';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const UserProfile = () => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      <Navbar />

      {/* Blurred glowing background circles */}
      <div className="absolute w-96 h-96 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-20 -left-20 z-0"></div>
      <div className="absolute w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-40 right-10 z-0"></div>

      <div className="flex justify-center items-center min-h-screen relative z-10">
        {user ? (
          <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center transition-all hover:scale-[1.02] border border-emerald-600">
            <FaUserCircle className="text-6xl text-emerald-400 mx-auto mb-6" />

            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-8">
              Welcome, {user.name}!
            </h2>

            <div className="text-lg text-gray-300 space-y-6">
              <p className="flex items-center justify-center gap-2">
                <FaUserCircle className="text-emerald-400" />
                <span className="font-semibold text-white">Name:</span> {user.name}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-emerald-400" />
                <span className="font-semibold text-white">Email:</span> {user.email}
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md text-center space-y-6 border border-slate-700">
            <h2 className="text-3xl font-bold text-white">You're not logged in</h2>
            <p className="text-gray-300 text-lg">Please login or signup to view your profile</p>
            <div className="flex justify-center gap-4 mt-6">
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all"
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
