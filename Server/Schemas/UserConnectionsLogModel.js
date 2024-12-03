const mongoose = require('mongoose');

const UserConnectionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true, // Each user should have only one record
    },
    last_ip_address: {
        type: String,
        required: true,
    },
    last_location: {
        type: String,
        required: false, // Optional if location might not always be available
    },
    last_connection_time: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    },
});

const UserConnectionsLogModel = mongoose.model('User_Connections_Log', UserConnectionSchema);

module.exports = UserConnectionsLogModel;
