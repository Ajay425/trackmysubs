import React, { useState } from "react";

const NewSubscriptionModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [renewalDate, setRenewalDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      name,
      price: parseFloat(price),
      billingCycle,
      renewalDate,
      status: "active",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-md shadow-lg border border-white/10">
        <h2 className="text-xl font-bold mb-4 text-white">Add New Subscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name (e.g. Netflix)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
            required
          />
          <input
            type="number"
            placeholder="Price (e.g. 9.99)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
            required
          />
          <input
            type="date"
            value={renewalDate}
            onChange={(e) => setRenewalDate(e.target.value)}
            className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
          />
          <select
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value)}
            className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
          >
            <option>Monthly</option>
            <option>Yearly</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-300 hover:text-white">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#7f5af0] text-white rounded hover:bg-[#6841e6]">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSubscriptionModal;
