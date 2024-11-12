// twilioConfig.js
require('dotenv').config();
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

function sendTextMessage(to, message) {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number in E.164 format, e.g., "+1234567890"
    to: to,
  });
}

module.exports = {
  sendTextMessage,
};
