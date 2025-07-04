import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  // Replace with your API call later
  useEffect(() => {
    setSubscriptions([
      {
        id: 1,
        name: "Netflix",
        price: 15.99,
        billingCycle: "Monthly",
        status: "active",
      },
      {
        id: 2,
        name: "Spotify",
        price: 5.99,
        billingCycle: "Monthly",
        status: "active",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 relative">
      {/* Glowing background */}
      <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Welcome header */}
        <div className="text-center animate-fadeZoom">
          <h1 className="text-4xl font-bold text-[#7f5af0] neon-text">Your Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage all your subscriptions in one place.</p>
        </div>

        {/* Summary section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeZoom">
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md">
            <h2 className="text-lg text-gray-300 mb-1">Total Subscriptions</h2>
            <p className="text-3xl font-bold text-white">{subscriptions.length}</p>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md">
            <h2 className="text-lg text-gray-300 mb-1">Total Cost</h2>
            <p className="text-3xl font-bold text-white">
              $
              {subscriptions.reduce((total, s) => total + s.price, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md">
            <h2 className="text-lg text-gray-300 mb-1">Status</h2>
            <p className="text-3xl font-bold text-green-400">Active</p>
          </div>
        </div>

        {/* Subscription List */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Subscriptions</h2>
            <Link
              to="/add-subscription"
              className="flex items-center gap-1 px-4 py-2 bg-[#7f5af0] hover:bg-[#6841e6] text-white rounded-md text-sm"
            >
              <FiPlus />
              Add New
            </Link>
          </div>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex justify-between items-center p-4 border border-white/10 rounded-lg bg-[#101010] hover:bg-[#161616] transition"
              >
                <div>
                  <h3 className="text-lg font-semibold">{sub.name}</h3>
                  <p className="text-gray-400 text-sm">${sub.price} / {sub.billingCycle}</p>
                </div>
                <div className="flex gap-3 text-gray-400">
                  <button className="hover:text-blue-400"><FiEdit /></button>
                  <button className="hover:text-red-500"><FiTrash2 /></button>
                </div>
              </div>
            ))}
            {subscriptions.length === 0 && (
              <p className="text-center text-gray-500">No subscriptions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
