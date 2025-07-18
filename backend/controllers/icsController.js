const {writeFileSync} = require('fs');
const  {createEvents} = require('ics');
const path = require('path');
const { create } = require('../models/User');
const Subscription = require('../models/subscription');


exports.generateCalender = async (req, res) => {
  try {
    const userId = req.user._id;
    const subscriptions = await Subscription.find({ user: userId });

    const events = subscriptions
      .filter(sub => sub.renewalDate instanceof Date && !isNaN(sub.renewalDate))
      .map(sub => ({
        title: `${sub.name} - Subscription Renewal`,
        description: `Reminder: ${sub.name} subscription renews soon`,
        start: [
          sub.renewalDate.getFullYear(),
          sub.renewalDate.getMonth() + 1,
          sub.renewalDate.getDate(),
          9, 0
        ],
        duration: { hours: 2 },
      }));

    createEvents(events, (error, value) => {
      if (error) {
        return res.status(500).json({ message: "ICS creation error", error });
      }

      res.setHeader('Content-Type', 'text/calendar');
      res.setHeader('Content-Disposition', 'attachment; filename=subscriptions.ics');
      return res.send(value);
    });
  } catch (err) {
    console.error("Calendar generation error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};