const cron = require("node-cron");
const Subscription = require("../models/subscription");
const sendEmail = require("../utils/sendEmail");

const checkAndSendReminders = () => {
  cron.schedule("* * * * *", async () => {
    console.log("[CRON] Running reminder job at", new Date().toISOString());

    try {
      const today = new Date();
      const allSubscriptions = await Subscription.find({ status: "active" }).populate("user");

      console.log(`[DEBUG] Found ${allSubscriptions.length} active subscriptions`);

      for (const sub of allSubscriptions) {
        const endDate = new Date(sub.endDate);
        const reminderDate = new Date(endDate);
        reminderDate.setDate(endDate.getDate() - sub.reminderDaysBeforeEnd);

        const todayStr = today.toISOString().slice(0, 10);
        const reminderStr = reminderDate.toISOString().slice(0, 10);

        console.log(`[CHECK] Subscription: ${sub.name}, Reminder Date: ${reminderStr}, Today: ${todayStr}`);

        if (reminderStr === todayStr) {
          console.log(`[SENDING] Sending email to ${sub.user.email} for subscription ${sub.name}`);

          await sendEmail({
            to: sub.user.email,
            subject: `Reminder: ${sub.name} ends soon!`,
            message: `Hi ${sub.user.fullName}, your subscription "${sub.name}" is ending on ${endDate.toDateString()}.`
          });
        }
      }
    } catch (err) {
      console.error("[ERROR] Failed to send reminders:", err);
    }
  });
};

module.exports = checkAndSendReminders;
