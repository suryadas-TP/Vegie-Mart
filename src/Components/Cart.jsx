import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { decreaseQty, increaseQty, removeFromCart, setCartItems } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://vegie-mart.onrender.com/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setCartItems(res.data.items));
      } catch (err) {
        console.error('Fetch cart failed:', err.response?.data || err.message);
      }
    };

    fetchCart();
  }, [dispatch]);

  const handleRemove = (id) => {
    try{
      const token = localStorage.getItem('token');
       axios.delete(`https://vegie-mart.onrender.com/api/cart/${id}`,{
         headers: { Authorization: `Bearer ${token}` },
      })
       dispatch(removeFromCart(id));
    }catch (err) {
    console.error('Remove item failed:', err.response?.data || err.message);
  }
   
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const isEligibleForDiscount = totalPrice > 1000;
  const discount = isEligibleForDiscount ? totalPrice * 0.2 : 0;
  const finalTotal = totalPrice - discount;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black min-h-screen text-white font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-24 px-4">
        <h1 className="text-4xl font-extrabold text-center text-emerald-400 mb-10">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 text-gray-400">
            <ShoppingCart size={64} className="mb-4 text-gray-500" />
            <p className="text-2xl">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6 mb-10">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between gap-6 p-5 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-fuchsia-700 hover:scale-[1.01] transition duration-300"
              >

                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl border border-gray-600"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white">{item.name}</h2>
                    <p className="text-sm text-gray-400">Price/kg: ₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <button
                    onClick={() => dispatch(decreaseQty(item._id))}
                    className="text-xl px-3 py-1 rounded-full bg-gray-700 hover:bg-red-700 transition font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-white">{item.qty} kg</span>
                  <button
                    onClick={() => dispatch(increaseQty(item._id))}
                    className="text-xl px-3 py-1 rounded-full bg-gray-700 hover:bg-green-700 transition font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-lg font-medium text-emerald-400">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border-2 border-emerald-500 mt-10">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">💰 Cart Summary</h2>
            <div className="text-lg text-gray-300 space-y-2">
              <p>Total Price: <span className="font-semibold text-white">₹{totalPrice.toFixed(2)}</span></p>

              {isEligibleForDiscount ? (
                <>
                  <p className="text-green-400">🎉 You got a <span className="font-bold">20% discount!</span></p>
                  <p>Discount: ₹{discount.toFixed(2)}</p>
                  <p className="text-xl font-bold text-emerald-300">Final Total: ₹{finalTotal.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-yellow-400">
                  🛍 Spend ₹{(1000 - totalPrice).toFixed(2)} more to unlock 20% off!
                </p>
              )}
            </div>

            <Link to="/payment">
              <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-3 rounded-full transition duration-300 shadow-xl">
                Proceed to Payment
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
