import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="relative w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-md rounded-full 
          flex items-center justify-center shadow-md shadow-[#7f5af0]/30 transition-all duration-300 
          hover:scale-105 hover:shadow-[0_0_20px_rgba(127,90,240,0.5)]"
        >
          <LuUser className="text-4xl text-[#7f5af0]" />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#7f5af0] hover:bg-[#6841e6] text-white 
            rounded-full flex items-center justify-center shadow"
            onClick={onChooseFile}
          >
            <LuUpload size={18} />
          </button>
        </div>
      ) : (
        <div
          className="relative w-24 h-24 transition-all duration-300 hover:scale-105 
          hover:shadow-[0_0_20px_rgba(127,90,240,0.5)]"
        >
          <img
            src={previewUrl}
            alt="profile"
            className="w-full h-full object-cover rounded-full border border-white/10 
            shadow-md shadow-[#7f5af0]/30"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 hover:bg-red-500 text-white 
            rounded-full flex items-center justify-center shadow"
            onClick={handleRemoveImage}
          >
            <LuTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
