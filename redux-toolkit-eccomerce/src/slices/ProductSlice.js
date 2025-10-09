import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const initialState = {
    products: [],
    isLoading: true,
    error: null
}
export const fetchProducts = createAsyncThunk("products/get", async () => {
    const res = await axios.get("http://localhost:3000/products")
    return res.data;
})
export const insertProducts = createAsyncThunk("products/post", async ({ title, price }) => {
    const res = await axios.post("http://localhost:3000/products", { title, price })
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
        }).addCase(insertProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(insertProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload)
        }).addCase(insertProducts.rejected, (state, action) => {
            state.isLoading = true;
            state.error = "products are not able to inserted"
        })
    }
})

export default ProductSlice.reducer;
