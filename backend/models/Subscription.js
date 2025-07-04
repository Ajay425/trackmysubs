const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    billingCycle: { type: String, required: true }, // e.g., monthly, yearly
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    reminderDaysBeforeEnd: { type: Number, default: 3, min: 0 }, // ✅ Fixed typo
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    notes: { type: String, default: "" }, // ✅ Optional field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
