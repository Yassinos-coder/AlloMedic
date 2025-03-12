import { io } from "socket.io-client";

// Initialize socket connection
const socket = io("http://192.168.0.104:8009", {
    transports: ["websocket"], // Use WebSocket transport
    forceNew: true, // Optional: Always create a new connection
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Number of retry attempts
    reconnectionDelay: 1000, // Time (ms) before retry
});

export default socket;
