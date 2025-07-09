const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    },
});

const sendEmail = async ({ to, subject, message }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
    });
    console.log("Sending email to", to);
}

module.exports = sendEmail;