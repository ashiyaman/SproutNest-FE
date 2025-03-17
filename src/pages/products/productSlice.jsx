import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SPROUTNEST_URI = 'http://localhost:3000'

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async() => {
        const response = await axios.get(`${SPROUTNEST_URI}/products`)
        return response.data
    }
)

export const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'success',
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
    }
})

export default productSlice.reducer