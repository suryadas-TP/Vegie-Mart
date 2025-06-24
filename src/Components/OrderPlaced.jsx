import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const OrderPlaced = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setOrders([]); // Clear if no token
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/ordered-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) setOrders(res.data);
      } catch (err) {
        console.error('Failed to load orders', err);
        setOrders([]); // Optional
      }
    };

    fetchOrders();
  }, []);

  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative">
      {/* ✅ Always show Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-black bg-opacity-80 backdrop-blur-lg shadow-lg">
        <Navbar />
      </div>

      <div className="pt-28 px-4 sm:px-6 lg:px-8 flex justify-center items-start z-10 relative">
        {(!token || orders.length === 0) ? (
          <div className="flex flex-col gap-6 items-center justify-center text-gray-300 text-xl w-full text-center">
            <p>📦 No orders placed yet!</p>
            <Link to="/vegies" className="text-emerald-400 hover:underline font-medium">
              ← Back to Home
            </Link>
          </div>
        ) : (
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

            <div className="mt-6 text-center">
              <Link to="/vegies" className="text-emerald-400 hover:underline font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPlaced;
