import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const OrderPlaced = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/ordered-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data || []);
      } catch (err) {
        console.error('Failed to load orders', err);
      }
    };

    fetchOrders();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-300 text-xl">
        No orders found...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Glowing Background Orbs */}
      <div className="absolute w-96 h-96 bg-green-700 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse -top-10 -left-10 z-0"></div>
      <div className="absolute w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse bottom-10 right-10 z-0"></div>

      {/* Main Content */}
      <div className="pt-28 px-4 sm:px-6 lg:px-8 flex justify-center items-start z-10 relative">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-emerald-600">
          <h1 className="text-3xl font-extrabold text-emerald-400 mb-4 text-center">
            🧾 Your Past Orders
          </h1>

          {orders.map((order, idx) => (
            <div key={idx} className="mb-8 border-b border-gray-700 pb-6">
              <h2 className="text-xl text-emerald-300 mb-2">
                Order #{orders.length - idx} • {new Date(order.createdAt).toLocaleString()}
              </h2>

              {order.items.map((item, i) => {
                const qty = item.qty ?? item.quantity ?? 1;
                const price = item.price ?? 0;
                return (
                  <div key={i} className="flex items-center gap-4 mb-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover border border-gray-600"
                      />
                    )}
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">Qty: {qty}</p>
                      </div>
                      <p className="text-emerald-400 font-semibold">
                        ₹ {(price * qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="mt-2 text-right text-emerald-400 font-semibold">
                Total Paid: ₹ {Number(order.totalAmount || order.total || 0).toFixed(2)}
              </div>

              <p className="text-sm text-gray-400 mt-1 text-right">
                Payment ID: {order.paymentId || 'N/A'}
              </p>
            </div>
          ))}

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a href="/vegies" className="text-emerald-400 hover:underline font-medium">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
