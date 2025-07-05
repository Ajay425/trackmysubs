const Subscription = require('../models/subscription');
const {isValidObjectId, Types} = require('mongoose');


// Dashboard Data
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [total, totalCost, statusBreakdown] = await Promise.all([
      Subscription.countDocuments({ user: userId }),
      Subscription.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, totalCost: { $sum: "$price" } } }
      ]),
      Subscription.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ])
    ]);

    const statusCounts = statusBreakdown.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, { active: 0, inactive: 0 });

    res.status(200).json({
      total,
      totalCost: totalCost[0]?.totalCost || 0,
      active: statusCounts.active || 0,
      inactive: statusCounts.inactive || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: err.message });
  }
};