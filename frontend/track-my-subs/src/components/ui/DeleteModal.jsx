import React from "react";

const DeleteModal = ({ open, subName, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181818] border border-[#7f5af0] rounded-xl p-8 shadow-xl max-w-sm w-full text-center animate-fadeIn">
        <h3 className="text-xl font-bold text-white mb-2">Delete Subscription</h3>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <span className="font-semibold text-[#7f5af0]">{subName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-[#7f5af0] text-white hover:bg-[#6841e6] font-semibold"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
