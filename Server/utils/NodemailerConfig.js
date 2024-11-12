const nodemailer = require('nodemailer');

// Create a transporter using SendGrid's SMTP
const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey', // SendGrid requires 'apikey' as the user
        pass: process.env.SENDGRID_API_KEY
    }
});

// Function to send verification email
const SendEmail = async (userEmail, verificationLink) => {
    const mailOptions = {
        from: 'noreply@yourdomain.com',
        to: userEmail,
        subject: 'Verify Your Email Address',
        html: `<p>Here is your code to verify your email:</p>
              `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

module.exports = { SendEmail }