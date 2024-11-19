import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosDefault from '../utils/AxiosDefault'
import { DecryptData } from "../utils/DataDecrypter";

export const CreateAccount = createAsyncThunk('user/CreateAccount', async ({ newUser }) => {
    try {
        const response = await AxiosDefault.post('/signup', newUser)
        let decryptedData = await DecryptData(response.data.encryptedResponse)
        console.log(decryptedData)
        return decryptedData;
    } catch (err) {
        console.error(`Error in CreateAccount ${err.message}`)
    }
})

export const Signin = createAsyncThunk('user/Signin', async ({ userCredentials }) => {
    try {
        const response = await AxiosDefault.post('/signin', userCredentials)
        let decryptedData = await DecryptData(response.data.encryptedResponse)
        return decryptedData;
    } catch (err) {
        console.error(`Error in Signin ${err.message}`)
    }
})


const UserReducer = createSlice({
    name: 'UserReducer',
    initialState: {
        userData: null,
        error: null,
        status: null,
        isLoggedIn: false,
        userGPSLocation: null
    },
    reducers: {
       setUserLocation(state, action) {
        state.userGPSLocation = action.payload
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateAccount.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.status = "fulfilled";
            })
            .addCase(CreateAccount.pending, (state) => {
                state.status = "pending";
            })
            .addCase(CreateAccount.rejected, (state, action) => {
                state.error = action.error;
                state.status = "rejected";
            })
            .addCase(Signin.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isLoggedIn = action.payload.message === 'LOGIN_SUCCESS' ? true : false
                state.status = "fulfilled";
            })
            .addCase(Signin.pending, (state) => {
                state.status = "pending";
            })
            .addCase(Signin.rejected, (state, action) => {
                state.error = action.error;
                state.status = "rejected";
            });
    }
});

export const { setUserLocation } = UserReducer.actions;
export default UserReducer.reducer

