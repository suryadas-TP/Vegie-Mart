import React from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { decreaseQty, increaseQty, removeFromCart } from '../redux/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
<div className="bg-gradient-to-br from-fuchsia-100 to-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-24 px-4">
        <h1 className="text-4xl font-extrabold text-center text-lime-800 mb-8">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80">
            <ShoppingCart size={64} className="mb-4 text-gray-500" />
            <p className="text-2xl text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid gap-6 mb-10">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition border-2 border-fuchsia-400"
              >
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-28 h-28 object-cover rounded-xl border border-gray-300" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">Price per kg: ₹ {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => dispatch(decreaseQty(item._id))}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xl hover:bg-gray-300"
                  >−</button>
                  <span className="text-lg font-semibold">{item.qty} kg</span>
                  <button
                    onClick={() => dispatch(increaseQty(item._id))}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xl hover:bg-gray-300"
                  >+</button>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <p className="text-lg font-medium text-green-700">Total: ₹ {item.price * item.qty}</p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total & Proceed Section */}
        {cartItems.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-lime-500 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-800 mb-3">Grand Total: ₹ {totalPrice}</h2>
            <Link to="/payment">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition shadow-lg">
                Proceed To Pay
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>

  )
}

export default Cart
