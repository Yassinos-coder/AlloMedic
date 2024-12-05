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
            const response = await AxiosDefault.post("/NewCall", newCall); // Save the call in the backend
            return response.data; // Return the server response
        } catch (error) {
            console.error("Error creating urgent call", error);
            throw error;
        }
    }
);

// Reducer slice for managing calls
const CallsReducer = createSlice({
    name: "CallsReducer",
    initialState: {
        calls: [], // List of all calls
        status: "",
        error: null,
    },
    reducers: {
        // Add a reducer for handling live updates
        updateCalls: (state, action) => {
            const updatedCall = action.payload;
            const existingIndex = state.calls.findIndex(
                (call) => call.id === updatedCall.id
            );
            if (existingIndex !== -1) {
                // Update existing call
                state.calls[existingIndex] = updatedCall;
            } else {
                // Add new call
                state.calls.push(updatedCall);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateUrgentCall.fulfilled, (state, action) => {
                state.calls.push(action.payload.call); // Add new call to the list
            })
            .addCase(CreateUrgentCall.pending, (state) => {
                state.status = "pending";
            })
            .addCase(CreateUrgentCall.rejected, (state, action) => {
                state.error = action.error.message;
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
