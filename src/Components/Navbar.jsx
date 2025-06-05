import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, UserPlus } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { FaUpload } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const cartItems = useSelector((state)=>state.cart.cartItems)
    const cartCount = cartItems.length
    return (
       <div className="bg-white/20 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-amber-200">
            <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text tracking-wide hover:scale-105 transition duration-300"
                    data-tooltip-id="brand-tooltip"
                    data-tooltip-content="Back to Purchase"
                >
                    <Link to="/vegies">VegieMart</Link>
                </h1>
                <Tooltip id="brand-tooltip" place="bottom" />

                {/* Nav Icons */}
                <ul className="flex items-center gap-6 text-gray-800 font-medium">
                    {/* Upload */}
                    <li className="relative group">
                        <Link to="/upload">
                            <FaUpload size={26}
                                className="hover:text-green-700 transition-transform hover:scale-110"
                                data-tooltip-id="upload-tooltip"
                                data-tooltip-content="Add Veggies"
                            />
                        </Link>
                        <Tooltip id="upload-tooltip" place="bottom" />
                    </li>

                    {/* Cart */}
                    <li className="relative group">
                        <Link to="/cart" className="relative">
                            <ShoppingCart size={30} className="hover:text-green-700 transition-transform hover:scale-110"
                                data-tooltip-id="cart-tooltip"
                                data-tooltip-content="View Cart"
                            />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Tooltip id="cart-tooltip" place="bottom" />
                    </li>

                    {/* Profile */}
                    <li className="relative group">
                        <Link to="/profile">
                            <User size={30}
                                className="hover:text-green-700 transition-transform hover:scale-110"
                                data-tooltip-id="profile-tooltip"
                                data-tooltip-content="Your Details"
                            />
                        </Link>
                        <Tooltip id="profile-tooltip" place="bottom" />
                    </li>

                    {/* Sign-up */}
                    <li>
                        <Link
                            to="/Signup"
                            className="text-lg text-white bg-green-500 px-4 py-1 rounded-full hover:bg-green-600 transition shadow"
                        >
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
