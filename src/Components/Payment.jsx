import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryCharge = 5;
  const grandTotal = (totalPrice + deliveryCharge).toFixed(2);
  const isFormValid = Object.values(billingInfo).every((value) => value.trim() !== '');

  const handlePayment = async () => {
    if (!isFormValid) {
      alert("Please fill in all billing details before proceeding to payment.");
      return;
    }

    const options = {
      key: "rzp_test_8ZXCUj1fk9UMyc",
      amount: grandTotal * 100,
      currency: "INR",
      name: "Vegie Mart",
      description: "Order Payment",
      handler: async function (response) {
        try {
          const token = localStorage.getItem('token');
          await axios.post(
            'http://localhost:3000/ordered-products',
            {
              items: cartItems.map((item) => ({
                productId: item._id,
                name: item.name,
                qty: item.qty,
                price: item.price,
                image: item.image,
              })),
              totalAmount: grandTotal,
              paymentId: response.razorpay_payment_id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          navigate('/order-placed');
        } catch (error) {
          console.error("Order save failed:", error);
          alert("Payment successful but order save failed.");
        }
      },
      prefill: {
        name: billingInfo.fullName,
        email: billingInfo.email,
      },
      theme: { color: "#14b8a6" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center px-6 py-10">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-[#0f172a] rounded-3xl shadow-2xl p-10 border border-cyan-700">
        {/* Billing Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Billing Info</h2>
          <form className="space-y-6">
            {['fullName', 'email', 'address', 'city', 'postalCode'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                className="w-full bg-transparent border border-cyan-500 rounded-lg px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                onChange={handleInputChange}
                type={field === 'email' ? 'email' : 'text'}
              />
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Order Summary</h2>
          <div className="bg-gray-800 rounded-2xl p-6 space-y-4 border border-gray-700 shadow-inner">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm md:text-base">
                <span>{item.name} × {item.qty} kg</span>
                <span>₹ {(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-gray-600 pt-4 text-sm">
              <span>Delivery</span>
              <span>₹ {deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-cyan-300 pt-2 border-t border-cyan-600">
              <span>Total</span>
              <span>₹ {grandTotal}</span>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
