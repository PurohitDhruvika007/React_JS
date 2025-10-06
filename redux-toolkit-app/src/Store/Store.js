import { configureStore } from '@reduxjs/toolkit';
import BookReducer from '../Slices/BookSlice.js'

const store = configureStore({
    reducer: {
        books: BookReducer,
    },
})

export default store;
