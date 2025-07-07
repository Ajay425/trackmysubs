import React from "react";
import { FiX, FiHome, FiPlus, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  return (
    <aside className="w-64 bg-[#101010] border-r border-white/10 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#7f5af0]">TrackMySubs</h2>
        {onClose && (
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <FiX />
          </button>
        )}
      </div>

      {/* Nav */}
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
      </nav>
    </aside>
  );
};

export default Sidebar;
