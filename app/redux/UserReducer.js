import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  name: "UserHandler",
  initialState: {
    userData: [],
    isUserConnected: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
  },
});

export default UserReducer.reducer;
