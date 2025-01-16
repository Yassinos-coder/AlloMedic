import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserReducer'
import CallsReducer from './CallsReducer'
import AppReducer from './AppReducer'

const Store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        CallsReducer: CallsReducer,
        AppReducer: AppReducer
    }
})

export default Store