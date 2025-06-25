import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Vegies = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('https://vegie-mart.onrender.com/getImage');
        if (!res.ok) throw new Error('Image fetch failed');
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Image fetch failed:", err);
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const cartHandle = async (img) => {
    if (!user) {
      toast.warn('Please log in or sign up to add products to cart.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://vegie-mart.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: img._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
      }

      dispatch(addTocart({
        _id: img._id,
        name: img.name,
        price: img.price,
        image: img.imageUrl,
        qty: 1
      }));
      toast.success('Added to cart successfully!');
    } catch (err) {
      console.error('Cart error:', err);
      toast.error(err.message || 'Something went wrong while adding to cart.');
    }
  };

  const filteredImages = images.filter((img) => {
    const nameMatches = img.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const price = parseFloat(img.price);
    let priceMatches = true;

    if (priceFilter === '10to20') priceMatches = price >= 10 && price <= 20;
    else if (priceFilter === '20to40') priceMatches = price >= 20 && price <= 40;
    else if (priceFilter === 'above50') priceMatches = price > 50;

    return nameMatches && priceMatches;
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white">
      {/* ✅ Fixed Navbar with proper z-index */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 backdrop-blur">
        <Navbar />
      </div>

      {/* ✅ Content below navbar with padding to prevent overlap */}
      <div className="pt-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-lg">
          <input
            type="text"
            placeholder="🔍 Search vegetables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-full bg-black/30 text-white placeholder-gray-400 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-full bg-black/30 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">💰 Filter by Price</option>
            <option value="10to20">₹10 - ₹20</option>
            <option value="20to40">₹20 - ₹40</option>
            <option value="above50">Above ₹50</option>
          </select>
        </div>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 pb-20">
          {loading ? (
            <p className="text-center text-xl text-gray-400 col-span-full animate-pulse">Loading...</p>
          ) : filteredImages.length > 0 ? (
            filteredImages.map((img) => (
              <div
                key={img._id || img.imageUrl}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-purple-600"
              >
                <img
                  src={img.imageUrl}
                  alt={img.name}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover rounded-t-3xl transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-purple-300 tracking-wide truncate">{img.name}</h2>
                  <p className="text-lg text-gray-300 my-2">₹ {img.price}</p>
                  <button
                    onClick={() => cartHandle(img)}
                    className="mt-3 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-400 col-span-full">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vegies;
