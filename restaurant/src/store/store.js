import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import orderReducer from "../slices/OrderSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
    },
});
