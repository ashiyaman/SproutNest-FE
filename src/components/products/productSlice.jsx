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

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async(categoryId) => {
        console.log('..in slice cate', categoryId)
        const response = await axios.get(`${SPROUTNEST_URI}/products/category/${categoryId}`)
        console.log(response.data)
        return response.data
    }
)

export const fetchProductById = createAsyncThunk(
    'product/fetchById',
    async(productId) => {
        const response = await axios.get(`${SPROUTNEST_URI}/products/${productId}`)
        return response.data
    }
)

export const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: [],
        selectedProduct: null,
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
            .addCase(fetchProductById.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'success',
                state.selectedProduct = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
            .addCase(fetchProductsByCategory.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'success',
                state.products = action.payload
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
    }
})

export default productSlice.reducer