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
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Menu Cases
            .addCase(fetchMenu.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Add Menu Item Cases
            .addCase(addMenuItem.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addMenuItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Update Menu Item Cases - Use itemId for finding the item
            .addCase(updateMenuItem.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex((i) => i.itemId === action.payload.itemId);
                if (index !== -1) state.items[index] = action.payload;
                state.error = null;
            })
            .addCase(updateMenuItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Delete Menu Item Cases - Use itemId for deletion
            .addCase(deleteMenuItem.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter((i) => i.itemId !== action.payload);
                state.error = null;
            })
            .addCase(deleteMenuItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default MenuSlice.reducer;