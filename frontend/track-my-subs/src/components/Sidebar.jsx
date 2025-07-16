import {useRef, React, useState} from "react";
import { FiX, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../utils/data";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfilePic(preview);
    }
  };

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <aside className="w-64 bg-[#101010] border-r border-white/10 p-6 flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7f5af0]">TrackMySubs</h2>
        {onClose && (
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <FiX />
          </button>
        )}
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative cursor-pointer" onClick={handleChooseFile}>
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#7f5af0]"
          />
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="absolute bottom-0 right-0 bg-[#7f5af0] p-1 rounded-full text-white text-xs">
            ✎
          </div>
        </div>
        <p className="mt-3 text-white font-semibold text-center text-sm">Ajay Bukkaraya</p>
      </div>

      {/* Menu + Logout */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col space-y-4">

          {SIDE_MENU_DATA.map(({ id, label, path, icon: Icon }) => (
            <Link
              key={id}
              to={path}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>

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