import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  name: "UserReducer",
  initialState: {
    userData: null,
    isUserConnected: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default UserReducer.reducer;
