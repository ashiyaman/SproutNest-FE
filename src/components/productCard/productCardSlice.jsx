import { createSlice } from "@reduxjs/toolkit";

export const productCardSlice = createSlice({
    name: 'productCard',
    initialState: {
        wishListedProducts: [],
        cartProducts: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addToWishlist: (state, action) => {
            state.wishListedProducts.push(action.payload)
        },
        removeFromWishList: (state, action) => {
            state.wishListedProducts.filter(product => product._id !== action.payload._id)
        },
        addToCart: (state, action) => {
            state.cartProducts.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cartProducts.filter(product => product._id !== action.payload._id)
        }
    }
})

export default productCardSlice.reducer

export const { addToWishlist, removeFromWishList, addToCart, removeFromCart } = productCardSlice.actions

