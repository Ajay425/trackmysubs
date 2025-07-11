import React from "react";
import { FiX, FiHome, FiPlus, FiSettings, FiLogOut, FiHelpCircle  } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const PROFILE_PIC_URL = "/uploads/default-profile.png"; // Change to dynamic/user image if available

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#101010] border-r border-white/10 p-6 flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#7f5af0]">TrackMySubs</h2>
        {onClose && (
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <FiX />
          </button>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={PROFILE_PIC_URL}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-[#7f5af0] shadow-md object-cover mb-2"
        />
        <span className="text-sm text-gray-400">Your Profile</span>
      </div>

      {/* Nav Links and Logout */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiHome />
            Dashboard
          </Link>
          <Link to="/add-subscription" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiPlus />
            Add Subscription
          </Link>
          <Link to="/settings" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiSettings />
            Settings
          </Link>
          <Link to="/faq" className="flex items-center gap-2 text-gray-300 hover:text-white">
          <FiHelpCircle />
              FAQ
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="pt-8">
          <button
            className="flex items-center gap-2 text-gray-300 hover:text-red-500 w-full px-4 py-2 rounded transition justify-center"
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
