import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Payment = () => {
    const cartItems = useSelector((state) => state.cart.cartItems)


    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const deliveryCharge = 5;
    const grandTotal = (totalPrice + deliveryCharge).toFixed(2);

    return (
        <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full grid md:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Billing Information</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded"/>
                        <input type="email" placeholder="Email Address" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="City" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="Postal Code" className="w-full border p-2 rounded" />
                    </form>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-700">Payment Details</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Card Number" className="w-full border p-2 rounded" />
                        <div className="flex gap-4">
                            <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded" />
                            <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded" />
                        </div>
                    </form>
                </div>


                <div>
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Order Summary</h2>
                    <div className="bg-green-100 rounded-lg p-4 space-y-2">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.name} × {item.qty} kg</span>
                                  <span>₹ {(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <span>Delivery</span>
                              <span>₹ {deliveryCharge.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{(parseFloat(totalPrice) + 5).toFixed(2)}</span>
                        </div>
                    </div>


                    <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Payment
