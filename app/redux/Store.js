import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserReducer'


const Store = configureStore({
    reducer: {
        UserHandler: UserReducer
    },
})

export default Store