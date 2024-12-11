const CallsModel = require("../Schemas/CallsModel");

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Listen for 'urgentCall' event
        socket.on("urgentCall", async (data) => {
            console.log("Urgent Call Received:", data);
            const newCall = new CallsModel(data)
            const iSaved = await newCall.save()
            if (!iSaved) {
                console.error('error')
            }
            // Emit the event to all connected clients (including the sender)
            io.emit("urgentCallUpdate", {
                call_id: iSaved._id,
                caller_id: data.caller_id,
                responder_id: data.responder_id,
                call_location: data.call_location,
                call_priority: data.call_priority,
                call_notes: data.call_notes,
                call_status: data.call_status,
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
