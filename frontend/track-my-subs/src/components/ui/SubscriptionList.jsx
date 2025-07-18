import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import NewSubscriptionModal from "../../pages/Dashboard/NewSubscriptionModal";
import EditSubscriptionModal from "../../pages/Dashboard/editSubscriptionModal";


const SubscriptionList = ({
  subscriptions,
  modalOpen,
  setModalOpen,
  handleAddSubscription,
  newlyAddedId,
  setSelectedSub,
  setEditModalOpen,
  editModalOpen,
  selectedSub,
  handleEditSubscription,
  handleDeleteSubscription,
}) => {
  const [hovered, setHovered] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, sub: null });
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.9, duration: 0.7, ease: "easeIn" }}
      className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md"
    >
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
        <AnimatePresence initial={false}>
          {subscriptions.map((sub) => (
            <motion.div
              key={sub.id}
              initial={newlyAddedId === sub.id ? { x: 60, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onMouseEnter={() => setHovered(sub.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                zIndex: hovered === sub.id ? 2 : 1,
                transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered === sub.id ? 'scale(1.04)' : hovered !== null ? 'scale(0.97)' : 'scale(1)',
              }}
              className={`flex justify-between items-center p-4 border border-white/10 rounded-lg bg-[#101010] hover:bg-[#161616] transition-all duration-500 ${
                newlyAddedId === sub.id
                  ? "ring-2 ring-[#7f5af0] shadow-lg"
                  : ""
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{sub.name}</h3>
                <p className="text-gray-400 text-sm">
                  ${sub.price} / {sub.billingCycle}
                </p>
              </div>
              <div className="flex gap-3 text-gray-400">
                <button
                  className="hover:text-blue-400"
                  onClick={() => {
                    setSelectedSub(sub);
                    setEditModalOpen(true);
                  }}
                >
                  <FiEdit />
                </button>
                <div className="relative group">
                  <button
                    className="hover:text-green-500"
                    // onClick={}
                  >
                    📅
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex px-2 py-1 rounded bg-gray-900 text-xs text-white whitespace-nowrap shadow-lg z-10 transition-opacity duration-200 opacity-90">
                    Export to Calendar
                  </div>
                </div>
                <EditSubscriptionModal
                  isOpen={editModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  subscription={selectedSub}
                  onUpdate={handleEditSubscription}
                />
                <button
                  className="hover:text-red-500"
                  onClick={() => setConfirmDelete({ open: true, sub })}
                >
                  <FiTrash2 />
                </button>
      <DeleteModal
        open={confirmDelete.open}
        subName={confirmDelete.sub?.name}
        onCancel={() => setConfirmDelete({ open: false, sub: null })}
        onConfirm={() => {
          handleDeleteSubscription(confirmDelete.sub._id);
          setConfirmDelete({ open: false, sub: null });
        }}
      />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {subscriptions.length === 0 && (
          <p className="text-center text-gray-500">No subscriptions found.</p>
        )}
      </div>
    </motion.div>
  );
};
export default SubscriptionList;