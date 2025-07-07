import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiMenu } from "react-icons/fi";
import NewSubscriptionModal from "./NewSubscriptionModal";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";


const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // 👈 sidebar toggle

 
  const fetchSubscriptions = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SUBSCRIPTIONS.GET_ALL);
    const data = res.data;

    if (Array.isArray(data)) {
      setSubscriptions(data);
    } else {
      setSubscriptions([]); // fallback if API doesn't return an array
    }
  } catch (err) {
    console.error("Failed to fetch subscriptions", err);
    setSubscriptions([]); // fallback on error
  }
};

  




  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
  console.log("Updated subscriptions:", subscriptions);
}, [subscriptions]);

   const handleAddSubscription = async (sub) => {
    // Simulate API call to add subscription
     const {
      name,
      price,
      billingCycle,
      renewalDate,
      status = "active", // Default status
      reminderDaysBeforeEnd,
      notes,
    } = sub;

    if (!name || !price || !billingCycle) {
      toast.error("Please fill in all fields.");
      return;

     }

     if (isNaN(price) || price <= 0) {
      toast.error("Price must be a valid number greater than 0.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.SUBSCRIPTIONS.CREATE, {
        name,
        price,
        billingCycle,
        renewalDate,
        status,
        reminderDaysBeforeEnd,
        notes,
      });
      setModalOpen(false);
      toast.success("Subscription added successfully!");
      fetchSubscriptions(); // Refresh subscriptions after adding

    } catch (error) {
      console.error("Error adding subscription:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Sidebar */}
      <div
      className={`fixed top-0 left-0 h-full w-64 z-40 bg-[#101010] border-r border-white/10 shadow-lg transform transition-transform duration-300 ease-in-out
       ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        {/* Sidebar Toggle */}
        {!sidebarOpen && (
        <button
        className="fixed top-6 left-6 z-50 text-gray-300 hover:text-white bg-[#1a1a1a] p-2 rounded-md shadow transition"
        onClick={() => setSidebarOpen(true)}>
        <FiMenu />
      </button>
    )}

        {/* Glowing Background */}
        <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fadeZoom">
            <h1 className="text-4xl font-bold text-[#7f5af0] neon-text">Your Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage all your subscriptions in one place.</p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeZoom">
            {/* Cards... */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md">
              <h2 className="text-lg text-gray-300 mb-1">Total Subscriptions</h2>
              <p className="text-3xl font-bold text-white">{subscriptions.length}</p>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md">
              <h2 className="text-lg text-gray-300 mb-1">Total Cost</h2>
              <p className="text-3xl font-bold text-white">
                ${subscriptions.reduce((total, s) => total + s.price, 0).toFixed(2)}
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
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1 px-4 py-2 bg-[#7f5af0] hover:bg-[#6841e6] text-white rounded-md text-sm"
              >
                <FiPlus />
                Add New
              </button>
              <NewSubscriptionModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddSubscription}
              />
            </div>

            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className={`flex justify-between items-center p-4 border border-white/10 rounded-lg bg-[#101010] hover:bg-[#161616] transition-all duration-500 ${
                    newlyAddedId === sub.id ? "animate-slideInSubscription ring-2 ring-[#7f5af0] shadow-lg" : ""
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-semibold">{sub.name}</h3>
                    <p className="text-gray-400 text-sm">
                      ${sub.price} / {sub.billingCycle}
                    </p>
                  </div>
                  <div className="flex gap-3 text-gray-400">
                    <button className="hover:text-blue-400">
                      <FiEdit />
                    </button>
                    <button className="hover:text-red-500">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
              {subscriptions.length === 0 && (
                <p className="text-center text-gray-500">No subscriptions found.</p>
              )}
            </div>
          </div>

          <style>{`
            @keyframes slideInSubscription {
              0% { opacity: 0; transform: translateX(60px) scale(0.98); }
              60% { opacity: 1; transform: translateX(-8px) scale(1.03); }
              100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            .animate-slideInSubscription {
              animation: slideInSubscription 0.8s cubic-bezier(0.4,0,0.2,1);
            }
              
          `}
          </style>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
