require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

const fileUpload = require("express-fileupload");
const io = require("@pm2/io");

io.init({
  transactions: true, // will enable the transaction tracing
  http: true, // will enable metrics about the http server (optional)
});

const app = express();

// Enable CORS with restrictions (replace '*' with allowed origins if needed)
app.use(cors({ origin: '*' }));  // Adjust allowed origins for better security

app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* HELMET FOR HEADERS SECURITY */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'", "https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js"], // Adjust script sources based on your needs
      imgSrc: ["'self'", "data:"], // Allow data URIs for inline images
      styleSrc: ["'self'", "'unsafe-inline'"], // Consider stricter style source restrictions
      fontSrc: ["'self'", "https://fonts.googleapis.com/"], // Adjust font sources based on your needs
      connectSrc: ["'self'", "https://your-api-domain.com"], // Replace with your API domain if applicable
    },
  })
);
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

// Set mongoose options
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "AlloMedic",
  })
  .then(() => {
    console.log("Database connection granted");
  })
  .catch((error) => {
    console.warn("Database connection error:", error.message);
  });

// Global error handling middleware (generic for now)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).send("Internal Server Error");
});

/* Security Note:
 * Consider implementing more specific error handling for different error types
 * to provide informative feedback to the client without revealing sensitive details.
 */

app.listen(process.env.BACK_END, () =>
  console.log(`Server Created Succesfuly on port ${process.env.BACK_END}`)
);
app.get("/", async (req, res) => {
  res.send(
    "<!DOCTYPE html>" +
      '<html lang="en">' +
      "<head>" +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      "<title>Allo Medic Backend Server</title>" +
      "<style>" +
      "body {" +
      'font-family: "Courier New", Courier, monospace;' +
      "text-align: center;" +
      "background-color: #f0f0f0;" +
      "color: #333;" +
      "}" +
      "h1 {" +
      'font-family: "Comic Sans MS", cursive, sans-serif;' +
      "font-size: 36px;" +
      "color: #ff4500;" +
      "margin-top: 50px;" +
      "}" +
      "h2 {" +
      'font-family: "Comic Sans MS", cursive, sans-serif;' +
      "font-size: 24px;" +
      "color: #0000ff;" +
      "margin-top: 20px;" +
      "}" +
      "</style>" +
      "</head>" +
      "<body>" +
      "<h1>Allo Medic Backend Server</h1>" +
      "<h2>Get outta here dumbass</h2>" +
      "</body>" +
      "</html>"
  );
});

/* API ROUTERS IMPORT */
const UserAPI = require("./APIs/UserAPI");
const OrderAPI = require("./APIs/OrdersAPI");
app.use(UserAPI, OrderAPI);
