import React, { useState, useEffect } from "react";
import Input from "../../components/Inputs/Input";

const EditSubscriptionModal = ({ isOpen, onClose, onUpdate, subscription }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reminderDaysBeforeEnd, setReminderDaysBeforeEnd] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (subscription) {
      setName(subscription.name || "");
      setPrice(subscription.price || "");
      setBillingCycle(subscription.billingCycle || "Monthly");
      setStartDate(subscription.startDate?.split("T")[0] || "");
      setEndDate(subscription.endDate?.split("T")[0] || "");
      setReminderDaysBeforeEnd(subscription.reminderDaysBeforeEnd || "");
      setNotes(subscription.notes || "");
    }
  }, [subscription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(subscription._id, {
      name,
      price,
      billingCycle,
      startDate,
      endDate,
      reminderDaysBeforeEnd,
      notes,
    });
    onClose();
  };

  if (!isOpen || !subscription) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl w-full max-w-lg shadow-lg border border-white/10 animate-fadeInModal">
        <h2 className="text-xl font-bold mb-4 text-white">Edit Subscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type="select"
            label="Billing Cycle"
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value)}
            options={["Monthly", "Quarterly", "Bi-Annually", "Yearly", "One-Time"]}
            required
          />
          <Input
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Input
            type="number"
            label="Reminder Days Before End"
            value={reminderDaysBeforeEnd}
            onChange={(e) => setReminderDaysBeforeEnd(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-300 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7f5af0] text-white rounded hover:bg-[#6841e6]"
            >
              Save Changes
            </button>
          </div>
        </form>
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

export default EditSubscriptionModal;
