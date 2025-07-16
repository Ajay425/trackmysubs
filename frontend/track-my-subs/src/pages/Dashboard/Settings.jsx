import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FiUser, FiLock, FiSave } from "react-icons/fi";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Simulate API call
    setTimeout(() => {
      if (form.newPassword !== form.confirmPassword) {
        setMessage("New passwords do not match.");
      } else if (!form.currentPassword || !form.newPassword) {
        setMessage("Please fill in all fields.");
      } else {
        setMessage("Password updated successfully!");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-[#101010] border-r border-white/10 shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative" style={{ marginLeft: sidebarOpen ? 280 : 40 }}>
        {/* Sidebar Toggle */}
        {!sidebarOpen && (
          <button
            className="fixed top-6 left-6 z-50 text-gray-300 hover:text-white bg-[#1a1a1a] p-2 rounded-md shadow transition"
            onClick={() => setSidebarOpen(true)}
          >
            <FiUser />
          </button>
        )}

        {/* Glowing Background */}
        <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

        <div className="relative z-10 max-w-xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fadeZoom">
            <h1 className="text-4xl font-bold text-[#7f5af0] neon-text mb-2">Settings</h1>
            <p className="text-gray-400 mt-2">Manage your account settings and change your password.</p>
          </div>

          {/* Settings Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-black/40 border border-white/10 rounded-xl p-8 backdrop-blur-md shadow-md space-y-6 animate-fadeIn"
          >
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="currentPassword">
                <FiLock className="inline mr-2" />Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="w-full p-3 rounded-md bg-[#181818] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                value={form.currentPassword}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="newPassword">
                <FiLock className="inline mr-2" />New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full p-3 rounded-md bg-[#181818] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                value={form.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">
                <FiLock className="inline mr-2" />Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 rounded-md bg-[#181818] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            {message && (
              <div className={`text-center text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</div>
            )}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#7f5af0] hover:bg-[#6841e6] text-white rounded-md text-lg font-semibold transition disabled:opacity-60"
              disabled={loading}
            >
              <FiSave /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
