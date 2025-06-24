import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, UserPlus, PackageCheck } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FaUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;

  return (
    <div className="bg-black/50 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center text-white">
        {/* Logo */}
        <h1
          className="text-3xl font-extrabold bg-gradient-to-r from-lime-400 to-emerald-400 text-transparent bg-clip-text tracking-wide hover:scale-105 transition duration-300"
          data-tooltip-id="brand-tooltip"
          data-tooltip-content="Back to Purchase"
        >
          <Link to="/vegies">VegieMart</Link>
        </h1>
        <Tooltip id="brand-tooltip" place="bottom" />

        {/* Nav Icons */}
        <ul className="flex items-center gap-6 font-medium">
          {/* Upload */}
          <li>
            <Link to="/upload">
              <FaUpload
                size={24}
                className="text-white hover:text-lime-300 transition-transform hover:scale-110"
                data-tooltip-id="upload-tooltip"
                data-tooltip-content="Add Veggies"
              />
            </Link>
            <Tooltip id="upload-tooltip" place="bottom" />
          </li>

          {/* Cart */}
          <li className="relative">
            <Link to="/cart">
              <ShoppingCart
                size={28}
                className="text-white hover:text-lime-300 transition-transform hover:scale-110"
                data-tooltip-id="cart-tooltip"
                data-tooltip-content="View Cart"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
            <Tooltip id="cart-tooltip" place="bottom" />
          </li>

          {/* Profile */}
          <li>
            <Link to="/profile">
              <User
                size={28}
                className="text-white hover:text-lime-300 transition-transform hover:scale-110"
                data-tooltip-id="profile-tooltip"
                data-tooltip-content="Your Details"
              />
            </Link>
            <Tooltip id="profile-tooltip" place="bottom" />
          </li>

          {/* Orders */}
          <li>
            <Link to="/order-placed">
              <PackageCheck
                size={28}
                className="text-white hover:text-lime-300 transition-transform hover:scale-110"
                data-tooltip-id="orders-tooltip"
                data-tooltip-content="My Orders"
              />
            </Link>
            <Tooltip id="orders-tooltip" place="bottom" />
          </li>

          {/* Sign Up */}
          <li>
            <Link
              to="/signup"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition shadow-md"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
