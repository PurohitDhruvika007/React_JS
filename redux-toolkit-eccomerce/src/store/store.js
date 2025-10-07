import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../slices/ProductSlice.js'

const store = configureStore({
    reducer: {
        product: productReducer,
    },
})

export default store;