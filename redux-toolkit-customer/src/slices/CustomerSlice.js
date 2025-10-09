import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    customers: [],
    isLoading: true,
    error: null
}
export const fetchCustomer = createAsyncThunk("customer/get", async () => {
    // const res = await axios.get("https://fakestoreapi.com/users")
    // return res.data;
    const res = await fetch("http://localhost:3000/customer")
    const data = await res.json()
    return data
})
export const insertCustomer = createAsyncThunk("customer/post", async ({ title, email }) => {
    const res = await axios.post("http://localhost:3000/customer", {
        title, email
    })
    console.log(res.data)
    return res.data;
})
const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
        addCustomers: (state, action) => {
            state.customers.push(action.payload)
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomer.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.customers = action.payload
        }).addCase(fetchCustomer.rejected, (state) => {
            state.isLoading = false;
            state.error = "not able to fetch data successfully"
        }).addCase(insertCustomer.pending, (state, action) => {
            state.isLoading = true
        }).addCase(insertCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.customers.push(action.payload)
        }).addCase(insertCustomer.rejected, (state, action) => {
            state.isLoading = true;
            state.error = "data does not inserted successfully"
        })
    }
})
export default customerSlice.reducer;
export const { addCustomers } = customerSlice.actions;