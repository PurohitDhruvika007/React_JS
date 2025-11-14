import userReducer from '../slices/userSlice.js'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
        }
    }
)