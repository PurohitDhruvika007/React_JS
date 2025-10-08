import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../slices/CustomerSlice.js"
const store = configureStore({
    reducer: {
        customer: customerReducer,
    },
})

export default store;