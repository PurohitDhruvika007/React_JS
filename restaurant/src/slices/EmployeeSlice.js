// src/slices/EmployeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch employees
export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async () => {
        const response = await axios.get("http://localhost:3000/employees");
        return response.data;
    }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id) => {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        return id;
    }
);

const initialState = {
    list: [],   // important: matches what EmployeeManager reads
    status: "idle",
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.list = state.list.filter(emp => emp.id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
