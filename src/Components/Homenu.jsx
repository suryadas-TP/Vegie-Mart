import React from 'react'
import image1 from '../assets/Images/homebg.jpg'
import { Link } from 'react-router-dom'
const Homenu = () => {
    return (
         <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${image1})` }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

                <div className="bg-white/20 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/30 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-amber-100 drop-shadow mb-6">
                        100% Fresh & Organic Veggies
                    </h1>

                    <div className="text-4xl md:text-5xl font-bold space-y-3 text-white">
                        <h2 className="text-amber-300">Your</h2>
                        <h2 className="text-blue-300">Organic</h2>
                        <h2 className="text-fuchsia-400">Store</h2>
                    </div>

                    <div className="mt-10">
                        <Link to="/vegies">
                            <button className="text-3xl md:text-4xl font-semibold px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:scale-105 transform transition duration-300">
                                🛒 Explore Veggies
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Homenu
