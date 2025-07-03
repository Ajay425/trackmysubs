const User = require('../models/User');
const Subscription = require('../models/Subscription');

// Add Subscription  Source
exports.addSubscription = async (req, res) => {
    const { name, price, billingCycle, startDate, endDate, status, reminderDaysBefore, category } = req.body;

    if (!name || !price || !endDate || !billingCycle) {
        return res.status(400).json({ message: "Name, price, billing cycle and end date are required" });
    }

    try {
        const subscription = await Subscription.create({
            user: req.user._id,
            name,
            description,
            price,
            billingCycle,
            startDate,
            endDate,
            status, 
            reminderDaysBefore,
            category,
        });
        await subscription.save();
        res.status(200).json(subscription);
    } catch (err) {
        res.status(500).json({ message: "Error adding subscription", error: err.message });
    }

}

// Get Subscriptions
exports.getSubscriptions = async (req, res) => {}

// Update Subscription
exports.updateSubscription = async (req, res) => {

}

// Delete Subscription
exports.deleteSubscription = async (req, res) => {
    
}
