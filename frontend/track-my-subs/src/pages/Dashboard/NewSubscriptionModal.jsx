import { number } from "framer-motion";
import React, { useState } from "react";
import Input from "../../components/Inputs/Input"; // Adjust the import path as necessary

const NewSubscriptionModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [renewalDate, setRenewalDate] = useState("");
  const [reminderDaysBeforeEnd, setReminderDaysBeforeEnd] = useState("");
  const [notes, setNotes] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave({
        id: Date.now(),
        name,
        price: parseFloat(price),
        billingCycle,
        renewalDate,
        status: "active",
      });
      // Clear form fields
      setName("");
      setPrice("");
      setBillingCycle("Monthly");
      setRenewalDate("");
      setReminderDaysBeforeEnd("");
      setNotes("");
      setIsSaving(false);
      onClose();
    }, 900); // Animation duration
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl w-full max-w-lg shadow-lg border border-white/10 animate-fadeInModal">
        <h2 className="text-xl font-bold mb-4 text-white">Add New Subscription</h2>
        {isSaving ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="animate-spin mb-4" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="#7f5af0" strokeWidth="6" strokeDasharray="31 100" />
            </svg>
            <span className="text-[#7f5af0] font-semibold text-lg animate-fadeIn">Adding Subscription...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 animate-fadeInModal">
            <Input
              type="text"
              label="Name of the subscription"
              placeholder="Name (e.g. Netflix)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
              required
            />
            <Input
              type="number"
              label="Price"
              placeholder="Price (e.g. 9.99)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
              required
            />
            <Input
              type="date"
              label="Renewal Date"
              placeholder="Please enter in DD-MM-YYYY format"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
            />
            <Input
              type="select"
              label="Billing Cycle"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              options={["Monthly", "Yearly", "Quarterly", "Bi-Annually", "One-Time"]}
            />

             <Input
              type="number"
              label="Reminder Days Before End"
              placeholder="How many days in advance would you like to receive a reminder?"
              value={reminderDaysBeforeEnd}
              onChange={(e) => setReminderDaysBeforeEnd(e.target.value)}
              className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
              required
            />

            <Input
              type="text"
              label="Notes"
              placeholder="Notes (e.g. Paying for 2 accounts)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-[#0f0f0f] border border-gray-700 rounded text-white"
            />

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-300 hover:text-white">Cancel</button>
              <button 
              type="submit" 
              className="px-4 py-2 bg-[#7f5af0] text-white rounded hover:bg-[#6841e6]">Save</button>
            </div>
          </form>
        )}
      </div>
      <style>{`
        @keyframes fadeInModal {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInModal {
          animation: fadeInModal 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default NewSubscriptionModal;
