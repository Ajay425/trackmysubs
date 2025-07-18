import { useRef, useState, useContext } from "react";
import { FiX, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../utils/data";
import { UserContext } from "../context/UserContext";
import { LuUser } from "react-icons/lu";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  // Removed profile picture editing feature

  const { user } = useContext(UserContext); // Access user from context
  const [preview, setPreview] = useState(null);

 


  const userProfilePic = user?.profileImageUrl || null;

  console.log("Current user in context:", user);
  console.log("Using profile image:", userProfilePic);
  console.log("Profile URL string:", typeof user?.profileImageUrl, user?.profileImageUrl);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const updatedUser = await uploadImage(file);
    console.log("Updated user after image upload:", updatedUser); // 👀

    updateUser(updatedUser);
    setPreview(null);
  } catch (err) {
    console.error("Failed to upload image:", err);
  }
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

      {/* Profile Picture Display Only */}
      <div className="flex flex-col items-center mb-8">
        {userProfilePic ? (
          <img
            src={userProfilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#7f5af0]"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-[#7f5af0] flex items-center justify-center">
            <LuUser className="text-white text-3xl" />
          </div>
        )}
        <p className="mt-3 text-white font-semibold text-center text-sm">
          {user?.fullName || "Welcome!"}
        </p>
      </div>

      {/* Menu */}
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
