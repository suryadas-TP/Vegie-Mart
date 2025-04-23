import React from 'react'
import image1 from '../assets/Images/homebg.jpg'
import { Link } from 'react-router-dom'
const Homenu = () => {
    return (
        <div>
            <div className='bg-cover min-h-screen' style={{ backgroundImage: `url(${image1})` }}>
                <div className='text-9xl text-center '>
                    <h1 className='text-amber-50 py-9'>100% Fresh & Organic Vegies</h1> <br />
                    <h1 className='text-amber-300 font-bold'>Your</h1>
                    <h1 className='text-blue-500 font-bold'>Organic</h1>
                    <h1 className='text-fuchsia-600 font-bold'>Store</h1>
                </div><br /><br />
                <div className='text-center'>
                    <button className='text-6xl font-serif bg-amber-700 rounded-2xl p-0.5'><Link to={"/vegies"}>Select vegies</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Homenu
