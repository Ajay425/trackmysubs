const User = require('../models/User');
const Subscription = require('../models/subscription');

// Add Subscription  Source
exports.addSubscription = async (req, res) => {
    const { name, price, billingCycle, startDate, endDate, status, reminderDaysBeforeEnd, notes } = req.body;

    if (!name || !price || !endDate || !billingCycle) {
        return res.status(400).json({ message: "Name, price, billing cycle and end date are required" });
    }

    try {
        const subscription = await Subscription.create({
            user: req.user._id,
            name,
            price,
            billingCycle,
            startDate,
            endDate,
            status, 
            reminderDaysBeforeEnd,
            notes,
        });
        await subscription.save();
        res.status(200).json(subscription);
    } catch (err) {
        res.status(500).json({ message: "Error adding subscription", error: err.message });
    }

}

// Get Subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user._id }).populate('user', 'fullName email');
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subscriptions", error: err.message });
    }
    
    
}

// Update Subscription
exports.updateSubscription = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        // Only allow updating subscriptions belonging to the user
        const subscription = await Subscription.findOneAndUpdate(
            { _id: id, user: req.user._id },
            updateFields,
            { new: true, runValidators: true }
        );
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found or not authorized" });
        }
        res.status(200).json(subscription);
    } catch (err) {
        res.status(500).json({ message: "Error updating subscription", error: err.message });
    }
};

// Delete Subscription
exports.deleteSubscription = async (req, res) => {
    const { id } = req.params;
    try {
        // Only allow deleting subscriptions belonging to the user
        const subscription = await Subscription.findOneAndDelete({ _id: id, user: req.user._id });
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found or not authorized" });
        }
        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting subscription", error: err.message });
    }
};
