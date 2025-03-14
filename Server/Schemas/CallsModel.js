const mongoose = require('mongoose');

const CallsSchema = new mongoose.Schema({
    caller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Assuming the caller is from the 'User' collection
        required: true,
    },
    responder_id: {
        type: String,
        ref: 'user', // Assuming the responder is from the 'User' collection
        required: false,
    },
    call_location: {
        type: Object, // Could be a string or a GeoJSON object for precise location data
        required: true,
    },
    call_notes: {
        type: String,
        required: false,
        trim: true, // Removes extra spaces from the beginning and end of the string
    },
    call_priority: {
        type: String,
        enum: ['Faible', 'Moyen', 'Urgent'], // Ensures only these values are allowed
        required: true,
        default: 'FAIBLE',
    },
    call_status: {
        type: String,
        enum: ['ongoing', 'completed', 'canceled'], // Tracks the current status of the call
        default: 'ongoing',
    },
    call_timestamp: {
        type: String,
        required: true
    },
    caller_data: {
        type: Object,
        required: false
    },
    call_price: { 
        type: String,
        required: false
    }
});

// Create the model
const CallsModel = mongoose.model('Ongoing_calls', CallsSchema);

module.exports = CallsModel;
