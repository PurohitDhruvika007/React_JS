// src/slices/MenuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all menu items
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
    const res = await axios.get("http://localhost:3000/menu");
    return res.data;
});

// Add a new menu item
export const addMenuItem = createAsyncThunk(
    "menu/addMenuItem",
    async (item) => {
        const res = await axios.post("http://localhost:3000/menu", item);
        return res.data;
    }
);

// Update menu item
export const updateMenuItem = createAsyncThunk(
    "menu/updateMenuItem",
    async ({ id, item }) => {
        const res = await axios.patch(`http://localhost:3000/menu/${id}`, item);
        return res.data;
    }
);

// Delete menu item
export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id) => {
        await axios.delete(`http://localhost:3000/menu/${id}`);
        return id;
    }
);

const MenuSlice = createSlice({
    name: "menu",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addMenuItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateMenuItem.fulfilled, (state, action) => {
                const index = state.items.findIndex((i) => i.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteMenuItem.fulfilled, (state, action) => {
                state.items = state.items.filter((i) => i.id !== action.payload);
            });
    },
});

export default MenuSlice.reducer;
