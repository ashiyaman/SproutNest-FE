import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const SPROUTNEST_URI = 'https://sprout-nest-be.vercel.app'

const SPROUTNEST_URI = 'http://localhost:3000'

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async() => {
        const response = await axios.get(`${SPROUTNEST_URI}/products`)
        return response.data
    }
)

export const fetchNewProducts = createAsyncThunk(
    'products/new/fetch',
    async() => {
        console.log('...in new fetch...')
        const response = await axios.get(`${SPROUTNEST_URI}/products?new=true`)
        console.log('...new pro...', response.data)
        return response.data
    }    
)

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async(categoryId) => {
        const response = await axios.get(`${SPROUTNEST_URI}/products/category/${categoryId}`)
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
        displayProducts: [],
        filteredProducts: [],
        products: [],
        selectedProduct: null,
        filter: 'All',
        status: 'idle',
        error: null
    },
    reducers: {
        setDisplayProducts: (state, action) => {
            state.displayProducts = action.payload
        },

        setRatingFilter: (state, action) => {
            const ratingThreshold = parseFloat(action.payload)
            state.filter = action.payload
            if(state.filter === 'All'){
                state.filteredProducts = [...state.products]
            }
            else{
                state.filteredProducts = state.products.filter(product => 
                        product.rating >= ratingThreshold.toFixed(2)
                    )
            }
        },
        setSearchFilter: (state, action) => {
            console.log('..in slice...', action.payload)
            const matchedProducts = state.products.filter(p => (p.name.toLowerCase().includes(action.payload) || p.details.includes(action.payload)))
            console.log(matchedProducts)
            state.displayProducts = matchedProducts
        }
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
            .addCase(fetchNewProducts.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchNewProducts.fulfilled, (state, action) => {
                state.status = 'success',
                state.products = action.payload
            })
            .addCase(fetchNewProducts.rejected, (state, action) => {
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

export const { setDisplayProducts, setRatingFilter, setSearchFilter } = productSlice.actions

export default productSlice.reducer