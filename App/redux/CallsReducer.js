import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../utils/socketExpo"; // Import your socket instance
import AxiosDefault from "../utils/AxiosDefault";

// Create an async action for creating an urgent call
export const CreateUrgentCall = createAsyncThunk(
    "calls/CreateUrgentCall",
    async (newCall) => {
        try {
            console.log(newCall);
            socket.emit("urgentCall", newCall); // Emit the event to the server
            return newCall; // Return newCall as the payload
        } catch (error) {
            console.error("Error creating urgent call", error);
            throw error; // Ensure the error is propagated
        }
    }
);

export const updateCallStatus = createAsyncThunk('calls/updateCallStatus', async (data) => {
    try {
        socket.emit('updateCallStatus', data)
        return data
    } catch (err) {
        console.error("Error creating urgent call", err);
        throw err; // Ensure the error is propagated
    }
})

export const GetOnGoingCalls = createAsyncThunk('calls/GetOnGoingCalls', async ({ }) => {
    try {
        const response = await AxiosDefault.get('/calls/GetOnGoingCalls')
        return response.data
    } catch (err) {
        console.error('ERROR IN GetOnGoingCalls Reducer')
    }
})

// Reducer slice for managing calls
const CallsReducer = createSlice({
    name: "CallsReducer",
    initialState: {
        calls: [], // List of all calls
        status: "", // Tracks the current status of actions (pending, fulfilled, etc.)
        error: null, // Holds error messages, if any
    },
    reducers: {
        // Reducer for handling live updates from the socket
        updateCalls: (state, action) => {
            const updatedCall = action.payload;
            const existingIndex = state.calls.findIndex(
                (call) => call.id === updatedCall.id
            );

            if (existingIndex !== -1) {
                // Update the existing call
                state.calls[existingIndex] = updatedCall;
            } else {
                // Add a new call if it doesn't exist
                state.calls.push(updatedCall);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateUrgentCall.fulfilled, (state, action) => {
                state.calls.push(action.payload); // Add newCall to the state
                state.status = "fulfilled"; // Optionally set status to track fulfillment
            })
            .addCase(CreateUrgentCall.pending, (state) => {
                state.status = "pending"; // Indicate the action is in progress
            })
            .addCase(CreateUrgentCall.rejected, (state, action) => {
                state.status = "rejected"; // Mark the action as rejected
                state.error = action.error.message; // Capture the error message
            })
            .addCase(GetOnGoingCalls.fulfilled, (state, action) => {
                state.calls = action.payload.calls; // Replace state.calls with the fetched data
                state.status = "fulfilled";
            })
            .addCase(GetOnGoingCalls.pending, (state) => {
                state.status = "pending"; // Indicate the action is in progress
            })
            .addCase(GetOnGoingCalls.rejected, (state, action) => {
                state.status = "rejected"; // Mark the action as rejected
                state.error = action.error.message; // Capture the error message
            });
    },
});

// Export the action to handle live updates
export const { updateCalls } = CallsReducer.actions;

// Export the reducer
export default CallsReducer.reducer;

// Attach the Socket.IO listener in your main entry point or where the store is initialized
export const initializeSocketListeners = (dispatch) => {
    socket.on("updateCall", (updatedCall) => {
        console.log("Call updated:", updatedCall);
        dispatch(updateCalls(updatedCall)); // Dispatch the updateCalls action with the new/updated call
    });
};
