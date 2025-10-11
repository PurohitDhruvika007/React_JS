import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [], // All orders
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        updateOrder: (state, action) => {
            const index = state.orders.findIndex(order => order.orderId === action.payload.orderId);
            if (index !== -1) {
                state.orders[index] = { ...state.orders[index], ...action.payload };
            }
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter(order => order.orderId !== action.payload);
        },
        updateStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.orders.find(order => order.orderId === orderId);
            if (order) order.status = status;
        },
        clearAllOrders: (state) => {
            state.orders = [];
        },
    },
});

export const { addOrder, updateOrder, deleteOrder, updateStatus, clearAllOrders } = orderSlice.actions;
export default orderSlice.reducer;
