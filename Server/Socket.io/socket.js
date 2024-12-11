const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Listen for 'urgentCall' event
        socket.on("urgentCall", (data) => {
            console.log("Urgent Call Received:", data);

            // Emit the event to all connected clients (including the sender)
            io.emit("urgentCallUpdate", {
                userId: data.userId,
                location: data.location,
                urgencyLevel: data.urgencyLevel,
                description: data.description,
                timestamp: new Date().toISOString(),
            });
        });

        // Handle client disconnect
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = setupSocket;
