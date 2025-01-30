// Import required packages
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const hpp = require("hpp");
const http = require("http"); // For creating HTTP server
const { Server } = require("socket.io"); // Import Socket.IO
const Routes = require('./Routes/Routes');
const setupSocket = require('./Socket.io/socket'); // Import socket handling logic

// Initialize express app
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Update this for production to restrict origins
        methods: ["GET", "POST"],
    },
});

// Initialize socket server
setupSocket(io);  // Pass the already initialized io to the socket handler

// Middleware to log every request
app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function (data) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
        oldSend.apply(res, arguments);
    };
    next();
});

// Security middlewares
app.use(helmet({
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "no-referrer" },
    hsts: process.env.NODE_ENV === "production" ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(hpp());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Parse incoming requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static('Uploads'))

// Database connection
const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {});
            console.info("Database connection successful");
            break;
        } catch (error) {
            retries -= 1;
            console.error("Database connection error:", error.message);
            console.info(`Retries left: ${retries}`);
            if (retries === 0) process.exit(1);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};
connectDB();

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.use('/server/api/v1', Routes);

// Define a catch-all route for undefined routes
app.use((req, res) => {
    console.warn(`404 - Not Found - ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: "Sorry, can't find that!" });
});

// Graceful shutdown setup
server.listen(process.env.PORT || 8009, () => {
    console.log(`Server running securely on port ${process.env.PORT || 8009}`);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
});

process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
});
