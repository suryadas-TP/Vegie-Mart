import React from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { removeFromCart } from '../redux/cartSlice'
import Vegies from './Vegies'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    // console.log('Removing:', name)
    dispatch(removeFromCart(id))
    // alert(`${Vegies.name} removed from cart`)
  }
  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0)
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-4xl text-center font-bold mt-6 text-lime-800">Your Cart</h1>
        <div className='flex flex-col  gap-4 p-5 '>
          {
            cartItems.length === 0 ? (
              <div className='flex items-center justify-center h-100'>
                <ShoppingCart size={64} className="mb-4" />
                <p className="text-4xl text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="border p-4 rounded-xl bg-white shadow-md flex justify-around items-center h-50">
                  <img src={item.image} alt={item.name} className="size-30 object-cover rounded-md" />
                  <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
                  <p className="text-lg text-green-700">Price : {"\u20B9"} {item.price}</p><br />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold w-20 h-10 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              ))
            )
          }
        </div>
      </div>
      <div className="w-screen flex justify-around mt-4">
        {
          cartItems.length === 0 ? (
            <div>
              <h2>add products to purchase</h2>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-green-700">Total : {"\u20B9"} {totalPrice} </h2>
              <button className='border-2 rounded-4xl p-2 bg-amber-600 hover:bg-green-600'>Proceed To Pay</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart
