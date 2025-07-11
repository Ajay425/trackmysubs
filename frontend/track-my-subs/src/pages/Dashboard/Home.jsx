import React, { use, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import SummaryCards from "./SummaryCards";
import SubscriptionList from "./SubscriptionList";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";
import { useUserAuth } from "../../hooks/useUserAuth"; // Custom hook for user authentication

const Dashboard = () => {
  useUserAuth(); // Call the custom hook to ensure user is authenticated
  const [subscriptions, setSubscriptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // 👈 sidebar toggle
  const [selectedSub, setSelectedSub] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = (sub) => {
    setSelectedSub(sub);
    setEditModalOpen(true);
  };

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
      id,
      name,
      price,
      billingCycle,
      startDate,
      endDate,
      reminderDaysBeforeEnd,
      status,
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
        id,
        name,
        price: parseFloat(price),
        billingCycle,
        startDate,
        endDate,
        reminderDaysBeforeEnd,
        status,
        notes,
      });
      setModalOpen(false);
      toast.success("Subscription added successfully!");
      fetchSubscriptions(); // Refresh subscriptions after adding
    } catch (error) {
      console.error(
        "Error adding subscription:",
        error.response?.data || error.message
      );
    }
  };

  // Delete subscription function
  const handleDeleteSubscription = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.SUBSCRIPTIONS.DELETE(id));
      toast.success("Subscription deleted successfully!");
      fetchSubscriptions(); // Refresh subscriptions after deletion
    } catch (error) {
      console.error(
        "Error deleting subscription:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete subscription.");
    }
  };

  // Edit subscription function (not implemented in this example)

  const handleEditSubscription = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.SUBSCRIPTIONS.UPDATE(id),
        updatedData
      );
      toast.success("Subscription updated successfully!");
      fetchSubscriptions(); // Refresh subscriptions after update
    } catch (error) {
      console.error(
        "Error updating subscription:",
        error.response?.data || error.message
      );
      toast.error("Failed to update subscription.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-[#101010] border-r border-white/10 shadow-lg transform transition-transform duration-300 ease-in-out
       ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative" style={{ marginLeft: '220px' }}>
        {/* Sidebar Toggle */}
        {!sidebarOpen && (
          <button
            className="fixed top-6 left-6 z-50 text-gray-300 hover:text-white bg-[#1a1a1a] p-2 rounded-md shadow transition"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
        )}

        {/* Glowing Background */}
        <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fadeZoom">
            <h1 className="text-4xl font-bold text-[#7f5af0] neon-text mb-2">
              Your Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage all your subscriptions in one place.
            </p>
          </div>

          {/* Summary */}
          <SummaryCards subscriptions={subscriptions} />
          <style>{`
            .perspective {
              perspective: 1000px;
            }
            .backface-hidden {
              backface-visibility: hidden;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
          `}</style>

          {/* Subscription List - Reveal after cards flip */}
          <SubscriptionList
            subscriptions={subscriptions}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleAddSubscription={handleAddSubscription}
            newlyAddedId={newlyAddedId}
            setSelectedSub={setSelectedSub}
            setEditModalOpen={setEditModalOpen}
            editModalOpen={editModalOpen}
            selectedSub={selectedSub}
            handleEditSubscription={handleEditSubscription}
            handleDeleteSubscription={handleDeleteSubscription}
          />

          <style>{`
            @keyframes slideInSubscription {
              0% { opacity: 0; transform: translateX(60px) scale(0.98); }
              60% { opacity: 1; transform: translateX(-8px) scale(1.03); }
              100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            .animate-slideInSubscription {
              animation: slideInSubscription 0.8s cubic-bezier(0.4,0,0.2,1);
            }
              
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
