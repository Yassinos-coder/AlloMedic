require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const expressWinston = require("express-winston");
const winston = require("winston");

/* Winston Logger Configuration */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

/* Limit number of requests */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();
app.use(cors());
app.use(express.static("uploads"));
/* Limit Data transfer by size */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(limiter);

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

/* API CALLS */

/* HELMET FOR HEADERS SECURITY */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Default policy for loading content such as JavaScript, images, CSS, fonts, AJAX requests, etc.
      //scriptSrc: ["'self'", "trusted-scripts.com"], // Trusted script sources
      //styleSrc: ["'self'", "trusted-styles.com"], // Trusted style sources
    },
  })
);
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Database connection granted");
  })
  .catch((error) => {
    console.warn("Database connection error:", error.message);
  });

app.use((err, req, res, next) => {
  // logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(process.env.BACK_END, () =>
  console.log(`Server Created Succesfuly on port ${process.env.BACK_END}`)
);

/* API ROUTERS IMPORT */
const UserAPI = require("./APIs/UserAPI");
const OrderAPI = require("./APIs/OrdersAPI");
app.use(UserAPI, OrderAPI);
