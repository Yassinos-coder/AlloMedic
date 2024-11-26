import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosDefault from '../utils/AxiosDefault'
import { DecryptData } from "../utils/DataDecrypter";

export const CreateAccount = createAsyncThunk('user/CreateAccount', async ({ newUser }) => {
    try {
        const response = await AxiosDefault.post('/signup', newUser)
        let decryptedData = await DecryptData(response.data.encryptedResponse)
        return decryptedData;
    } catch (err) {
        console.error(`Error in CreateAccount ${err.message}`)
    }
})

export const Signin = createAsyncThunk('user/Signin', async ({ userCredentials }) => {
    try {
        const response = await AxiosDefault.post('/signin', userCredentials)
        let decryptedData = await DecryptData(response.data.encryptedResponse)
        console.log('From redux', decryptedData)
        return decryptedData;
    } catch (err) {
        console.error(`Error in Signin ${err.message}`)
    }
})

export const GetUserData = createAsyncThunk('user/GetUserData', async ({ uuid }) => {
    try {
        const response = await AxiosDefault.get(`/GetUserData/${uuid}`)
        let decryptedData = await DecryptData(response.data.encryptedResponse)
        return decryptedData;
    } catch (err) {
        console.error(`Error in GetUserData ${err.message}`)
    }
})


const UserReducer = createSlice({
    name: 'UserReducer',
    initialState: {
        userData: {},
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
                state.userData = action.payload.userData;
                state.status = "fulfilled";
            })
            .addCase(CreateAccount.pending, (state) => {
                state.status = "pending";
            })
            .addCase(CreateAccount.rejected, (state, action) => {
                state.error = action.payload.message;
                state.status = "rejected";
            })
            .addCase(Signin.fulfilled, (state, action) => {
                state.userData = action.payload.userData;
                console.log('From redux 2', action.payload.userData)

                state.isLoggedIn = action.payload.message === 'LOGIN_SUCCESS' ? true : false
                state.status = "fulfilled";
            })
            .addCase(Signin.pending, (state) => {
                state.status = "pending";
            })
            .addCase(Signin.rejected, (state, action) => {
                state.error = action.payload.message;
                state.status = "rejected";
            })
            .addCase(GetUserData.fulfilled, (state, action) => {
                state.userData = action.payload.userData;
                state.status = "fulfilled";
            })
            .addCase(GetUserData.pending, (state) => {
                state.status = "pending";
            })
            .addCase(GetUserData.rejected, (state, action) => {
                state.error = action.payload.message;
                state.status = "rejected";
            });
    }
});

export const { setUserLocation } = UserReducer.actions;
export default UserReducer.reducer

