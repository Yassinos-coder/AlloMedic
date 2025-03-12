const CallsModel = require("../Schemas/CallsModel");

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Listen for 'urgentCall' event
        socket.on("urgentCall", async (data) => {
            try {
                console.log("Urgent Call Received:", data);

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
                        caller_data: data.caller_data,
                        call_location: {
                            address: data.call_location.address,
                            coords: data.call_location.coords,

                        },
                        call_priority: data.call_priority,
                        call_notes: data.call_notes,
                        call_status: data.call_status,
                        call_timestamp: data.call_timestamp,
                        call_price: data.call_price,
                        call_sent: 'success'
                    });
                }
            } catch (error) {
                console.error("Error in handling urgent call:", error);
            }
        });

        socket.on('updateCallStatus', async (data) => {
            try {
                let call_id = data.call_id
                await CallsModel.updateOne({ _id: call_id }, { call_status: 'completed' })

                io.emit('urgentCallUpdate', {

                })
            } catch (err) {

            }
        })
        socket.on('triggerCallAccepted', async (data) => {
            try {
                let call_id = data.call_id
                io.emit('triggerCallAcceptedForClient')
                console.log('Call accepted')
            } catch (err) {
                console.err(`Error on triggerCallAccepted, ${err.message}`)
            }
        })

        // Handle client disconnect
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = setupSocket;
