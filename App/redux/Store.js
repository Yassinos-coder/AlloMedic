import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserReducer'
import CallsReducer from './CallsReducer'

const Store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        CallsReducer: CallsReducer
    }
})

export default Store