import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { clearCart } from '../redux/cartSlice'; // optional

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
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
        // alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        try {
          const token = localStorage.getItem('token');
          await axios.post(
            'http://localhost:3000/ordered-products',
            {
              items: cartItems.map((item) => ({
                productId: item._id,         // ✅ Required by backend
                name: item.name,
                qty: item.qty,
                price: item.price,
                 image: item.image,
              })),
              totalAmount: grandTotal,
              paymentId: response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // dispatch(clearCart()); // ✅ Uncomment to clear cart after order
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
      theme: {
        color: "#22c55e",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Billing Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Billing Information</h2>
          <form className="space-y-4">
            <input name="fullName" type="text" placeholder="Full Name" className="w-full border p-2 rounded" onChange={handleInputChange} />
            <input name="email" type="email" placeholder="Email Address" className="w-full border p-2 rounded" onChange={handleInputChange} />
            <input name="address" type="text" placeholder="Address" className="w-full border p-2 rounded" onChange={handleInputChange} />
            <input name="city" type="text" placeholder="City" className="w-full border p-2 rounded" onChange={handleInputChange} />
            <input name="postalCode" type="text" placeholder="Postal Code" className="w-full border p-2 rounded" onChange={handleInputChange} />
          </form>
        </div>

        {/* Order Summary */}
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
              <span>₹ {grandTotal}</span>
            </div>
          </div>

          <button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
