import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const initialState = {
    products: [],
    isLoading: true,
    error: null
}
export const fetchProducts = createAsyncThunk("products/get", async () => {
    const res = await axios.get("https://fakestoreapi.com/products")
    return res.data;
})
const ProductSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        }).addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false;
            state.error = "data is not fetched successfully";
        })
    }
})

export default ProductSlice.reducer;
