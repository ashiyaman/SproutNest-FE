import { createSlice } from "@reduxjs/toolkit";

export const productCardSlice = createSlice({
    name: 'productCard',
    initialState: {
        wishListedProducts: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addToWishlist: (state, action) => {
            state.wishListedProducts.push(action.payload)
        },
        removeFromWishList: (state, action) => {
            state.wishListedProducts.filter(product => product._id !== action.payload)
        }
    }
})

export default productCardSlice.reducer

export const { addToWishlist, removeFromWishList } = productCardSlice.actions

