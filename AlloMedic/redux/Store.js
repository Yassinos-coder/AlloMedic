import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";

const Store = configureStore({
    reducer: {
        userHandler : UserReducer
    }
})

export default Store