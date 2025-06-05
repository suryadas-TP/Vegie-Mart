import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { addTocart } from '../redux/cartSlice';
import image2 from '../assets/Images/bg.jpg'
import { toast } from 'react-toastify';

const Vegies = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const dispatch = useDispatch()


  useEffect(() => {
    fetch('http://localhost:3000/getImage')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setImages(data);
      })
      .catch((err) => console.error("Image fetch failed", err));
  }, []);

  const cartHandle = (img) => {
    dispatch(addTocart(img))
    toast.success(' Added to cart successfully!')
  }
  const filteredImages = images.filter((img) => {
    const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase());

    const price = parseFloat(img.price);
    let matchesPrice = true;

    if (priceFilter === '10to20') {
      matchesPrice = price >= 10 && price <= 20;
    } else if (priceFilter === '20to40') {
      matchesPrice = price >= 20 && price <= 40;
    } else if (priceFilter === 'above50') {
      matchesPrice = price > 50;
    }

    return matchesSearch && matchesPrice;
  })
  return (
    <div className="min-h-screen bg-gradient-to-tr from-fuchsia-100 via-pink-100 to-rose-200">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="pt-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="🔍 Search vegetables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-full border-2 border-purple-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-full border-2 border-purple-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Filter by Price</option>
            <option value="10to20">₹10 - ₹20</option>
            <option value="20to40">₹20 - ₹40</option>
            <option value="above50">Above ₹50</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
          {filteredImages.length > 0 ? (
            filteredImages.map((img) => (
              <div
                key={img._id || img.imageUrl}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
              >
                <img
                  src={img.imageUrl}
                  alt={img.name}
                  className="
            w-full rounded-t-2xl 
            h-48 sm:h-56 md:h-60 
            object-contain md:object-cover 
            transition-transform duration-300 hover:scale-105
          "
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold text-purple-800">{img.name}</h2>
                  <p className="text-lg text-gray-700 my-2">₹ {img.price}</p>
                  <button
                    onClick={() => cartHandle(img)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-600 col-span-full">No items found.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Vegies
