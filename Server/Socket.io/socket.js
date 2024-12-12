const CallsModel = require("../Schemas/CallsModel");
const axios = require('axios');

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Listen for 'urgentCall' event
        socket.on("urgentCall", async (data) => {
            try {
                console.log("Urgent Call Received:", data);

                // Reverse geocoding request
                const reverseGeoCoding = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                    params: {
                        key: process.env.GEO_API_KEY,
                        pretty: 1,
                        no_annotations: 1,
                        q: data.call_location
                    }
                });

                console.log(reverseGeoCoding.data.results[0]?.formatted);
                data.call_location = reverseGeoCoding.data.results[0]?.formatted
                // Save the new call
                const newCall = new CallsModel(data);
                const savedCall = await newCall.save();

                if (!savedCall) {
                    console.error('Error saving call');
                } else {
                    // Emit the event to all connected clients (including the sender)
                    io.emit("urgentCallUpdate", {
                        call_id: savedCall._id,
                        caller_id: data.caller_id,
                        responder_id: data.responder_id,
                        call_location: data.call_location,
                        call_priority: data.call_priority,
                        call_notes: data.call_notes,
                        call_status: data.call_status,
                        timestamp: new Date().toISOString(),
                    });
                }
            } catch (error) {
                console.error("Error in handling urgent call:", error);
            }
        });

        // Handle client disconnect
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = setupSocket;
