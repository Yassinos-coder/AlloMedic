require("dotenv").config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const SendSMS = (to, msg) => {
  if (!accountSid || !authToken) {
    console.error(
      "Twilio credentials are missing. Check your environment variables."
    );
    return "Twilio credentials are missing. Check your environment variables.";
  }

  if (typeof to !== "string" || typeof msg !== "string") {
    console.error("Error in data passed to function. Check data types.");
    return "Error in data passed to function. Check data types.";
  }

  return client.messages
    .create({ from: "+16592667772", to: to, body: msg })
    .then((message) => {
      console.log("Message sent successfully:", message.sid);
      return message.sid;
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      return error;
    });
};


module.exports = { SendSMS };
