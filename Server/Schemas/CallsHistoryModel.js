const mongoose = require('mongoose');

const CallsHistorySchema = new mongoose.Schema({
    caller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection for the caller
        required: true,
    },
    responder_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic', // Reference to the Medic collection for the responder
        required: true,
    },
    call_location: {
        type: String, // Location where the call occurred
        required: true,
    },
    call_notes: {
        type: String, // Notes about the call
        required: true,
        trim: true,
    },
    call_priority: {
        type: String,
        enum: ['low', 'medium', 'high'], // Priority of the call
        required: true,
    },
    call_status: {
        type: String,
        enum: ['completed', 'canceled'], // Final status of the call
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model
const CallsHistoryModel = mongoose.model('Calls_History', CallsHistorySchema);

module.exports = CallsHistoryModel;
