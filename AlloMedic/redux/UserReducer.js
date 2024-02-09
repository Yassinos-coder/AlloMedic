import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosDefault from "../utils/AxiosDefault";

export const Signin = createAsyncThunk(
  "users/Signin",
  async ({ loginData }) => {
    try {
      const response = await AxiosDefault.post("/api/users/signin", loginData);
      return response.data;
    } catch (err) {
      console.warn(err);
    }
  }
);

const UserReducer = createSlice({
  name: "UserReducer",
  initialState: {
    userData: null,
    isUserConnected: null,
    status: null,
    error: null,
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isUserConnected = true;
      console.log(state.isUserConnected)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Signin.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.status = "accepted";
      })
      .addCase(Signin.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(Signin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const { setConnectionStatus } = UserReducer.actions;

export default UserReducer.reducer;
