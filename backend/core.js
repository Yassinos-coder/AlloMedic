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
app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
/* HELMET FOR HEADERS SECURITY */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
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

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

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
