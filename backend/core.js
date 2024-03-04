require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

const fileUpload = require("express-fileupload");
const io = require('@pm2/io')

io.init({
  transactions: true, // will enable the transaction tracing
  http: true, // will enable metrics about the http server (optional)
})

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

/* API ROUTERS IMPORT */
const UserAPI = require("./APIs/UserAPI");
const OrderAPI = require("./APIs/OrdersAPI");
app.use(UserAPI, OrderAPI);
