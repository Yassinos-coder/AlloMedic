import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosDefault from '../utils/AxiosDefault'
import { DecryptData } from "../utils/DataDecrypter";
import * as SecureStore from 'expo-secure-store'

export const CreateAccount = createAsyncThunk('user/CreateAccount', async ({ newUser }) => {
    try {
        const response = await AxiosDefault.post('/signup', newUser)
        let decryptedData = await DecryptData(response.data)
        return decryptedData;
    } catch (err) {
        console.error(`Error in CreateAccount ${err.message}`)
    }
})

export const Signin = createAsyncThunk('user/Signin', async ({ userCredentials }) => {
    try {
        const response = await AxiosDefault.post('/signin', userCredentials)
        let decryptedData = await DecryptData(response.data)
        return decryptedData;
    } catch (err) {
        console.error(`Error in Signin ${err.message}`)
    }
})

export const GetUserData = createAsyncThunk('user/GetUserData', async ({ uuid }) => {
    try {
        const response = await AxiosDefault.get(`/GetUserData/${uuid}`)
        let decryptedData = await DecryptData(response.data)
        return decryptedData;
    } catch (err) {
        console.error(`Error in GetUserData ${err.message}`)
    }
})

export const UpdateUserData = createAsyncThunk('user/UpdateUserData', async ({ newData, dataToUpdate, uuid }) => {
    try {
        const response = await AxiosDefault.post(`/UpdateUserData/${dataToUpdate}/${uuid}`, newData)
        return response.data
    } catch (err) {
        console.log('error in redux', err.message)
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
                state.userData = action.payload.userData ?  action.payload.userData : {};
                let userDataString = JSON.stringify(action.payload.userData)
                SecureStore.setItemAsync('userData', userDataString)
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
            })
            .addCase(UpdateUserData.fulfilled, (state, action) => {
                //state.userData = action.payload.userData;
                state.status = "fulfilled";
            })
            .addCase(UpdateUserData.pending, (state) => {
                state.status = "pending";
            })
            .addCase(UpdateUserData.rejected, (state, action) => {
                // state.error = action.payload.message;
                state.status = "rejected";
            })
    }
});

export const { setUserLocation } = UserReducer.actions;
export default UserReducer.reducer

