import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
    const response = await axios.get("http://localhost:3000/orders");
    return response.data;
});

// Create a new empty order
export const createEmptyOrder = createAsyncThunk("orders/createEmptyOrder", async ({ employeeId, employeeName }) => {
    const newOrder = {
        employeeId,
        employeeName,
        customerName: "",
        customerContact: "",
        customerAddress: "",
        tableNo: "",
        paymentMode: "Cash",
        status: "Pending",
        items: [],
        subtotal: 0,
        gst: 0,
        discount: 0,
        total: 0,
    };
    const response = await axios.post("http://localhost:3000/orders", newOrder);
    return response.data;
});

// Patch/update an order
export const patchOrder = createAsyncThunk("orders/patchOrder", async ({ id, patch }) => {
    const response = await axios.patch(`http://localhost:3000/orders/${id}`, patch);
    return response.data;
});

// Delete an order
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id) => {
    await axios.delete(`http://localhost:3000/orders/${id}`);
    return id;
});

// Finalize order
export const finalizeOrder = createAsyncThunk("orders/finalizeOrder", async ({ id, invoicePayload }) => {
    await axios.post("http://localhost:3000/invoices", invoicePayload);
    await axios.delete(`http://localhost:3000/orders/${id}`);
    return id;
});

const OrderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        selectedOrderId: null,
        status: "idle",
        error: null,
    },
    reducers: {
        selectOrder: (state, action) => {
            state.selectedOrderId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => { state.orders = action.payload; })
            .addCase(createEmptyOrder.fulfilled, (state, action) => { state.orders.push(action.payload); })
            .addCase(patchOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) state.orders[index] = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(o => o.id !== action.payload);
            })
            .addCase(finalizeOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(o => o.id !== action.payload);
            });
    },
});

export const { selectOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
