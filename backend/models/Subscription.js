const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        billingCycle: { type: String, required: true }, // e.g., monthly, yearly
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, required: true },
        redminerDaysBeforeEnd: { type: Number, default: 7, min:0 }, // days before end date to send reminder
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        notes: { type: String, default: "" }
    },
    { timestamps: true });

    module.exports = mongoose.model("Subscription", subscriptionSchema);
