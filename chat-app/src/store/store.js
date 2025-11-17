import userReducer from '../slices/userSlice.js'
import chatReducer from '../slices/chatSlice.js'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            chat: chatReducer
        }
    }
)