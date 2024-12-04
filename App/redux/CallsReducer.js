import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../utils/socketExpo"; // Import your socket instance
import AxiosDefault from "../utils/AxiosDefault";

// Create an async action for creating an urgent call
export const CreateUrgentCall = createAsyncThunk(
    'calls/CreateUrgentCall',
    async ( callDetails ) => {
        try {
            console.log(callDetails)
            // Emit urgent call to Socket.IO server
            socket.emit('urgentCall', callDetails);
            // Optionally, make an API call to persist data in your database
         //   const response = await AxiosDefault.post('/api/urgent-calls', callDetails);
            // If API call is successful, return data (optional)
        //    return response.data;
        } catch (error) {
            // Handle error
            console.error("Error creating urgent call", error);
            throw error;
        }
    }
);

// Initial state for the calls slice
const initialState = {
    calls: [],
    loading: false,
    error: null,
};

// Reducer slice for managing calls
const CallsReducer = createSlice({
    name: 'CallsReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateUrgentCall.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateUrgentCall.fulfilled, (state, action) => {
                state.loading = false;
                state.calls.push(action.payload); // Optionally, add the new call to state
            })
            .addCase(CreateUrgentCall.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default CallsReducer.reducer;
