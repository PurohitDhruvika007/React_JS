// src/slices/ProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// JSON Server URL
const API_URL = "http://localhost:3000/products";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
};

// FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

// ADD PRODUCT
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product) => {
        const response = await axios.post(API_URL, product);
        return response.data;
    }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updatedProduct }) => {
        const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
        return response.data;
    }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch products";
            })

            // ADD
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to add product";
            })

            // UPDATE
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.products.findIndex(
                    (p) => p.id === action.payload.id
                );
                if (index !== -1) state.products[index] = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to update product";
            })

            // DELETE
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to delete product";
            });
    },
});

export default productSlice.reducer;
