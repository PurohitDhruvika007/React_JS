// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import productReducer from "../slices/ProductSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
    },
});
