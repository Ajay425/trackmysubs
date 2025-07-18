require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const icsRoutes = require("./routes/icsRoutes");
const startEmailReminderJob = require("./utils/cronJobs");
const sendEmail = require("./utils/sendEmail");



const app = express();


app.use(
    cors ({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],

    })
)

connectDB();
app.use(express.json());
console.log('authRoutes is', typeof authRoutes);          // should print 'function'
console.log('subscriptionRoutes is', typeof subscriptionRoutes);



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/v1/ics", icsRoutes )




startEmailReminderJob(); // Start the cron job for sending reminders


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));