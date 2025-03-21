import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const productCardSlice = createSlice({
    name: 'productCard',
    initialState: {
        wishListedProducts: [],
        cartProducts: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addProduct: (state, action) => {
            const {type, product} = action.payload
            const targetList = type === 'wishlist' ? state.wishListedProducts : state.cartProducts

            const existingProduct = targetList.find(p => p._id === product._id)
            if(existingProduct){
                existingProduct.quantity += 1
            }
            else{
                type === 'wishlist' ? 
                    state.wishListedProducts.push({...product, quantity: 1}) :
                    state.cartProducts.push({...product, quantity: 1})
            }
        },
        removeProduct: (state, action) => {
            const {type, product} = action.payload
            const targetList = type === 'wishlist' ? state.wishListedProducts : state.cartProducts
            type === 'wishlist' ? 
                state.wishListedProducts = state.wishListedProducts.filter(p => p._id !== product._id) :
                state.cartProducts = state.cartProducts.filter(p => p._id !== product._id)
        },
        changeQuantity: (state, action) => {
            const {type, product, change} = action.payload
            const targetList = type === 'wishlist' ? state.wishListedProducts : state.cartProducts
            const existingProduct = targetList.find(p => p._id === product._id)

            if(existingProduct){
                if(existingProduct.quantity === 1 && change === -1){
                    type === 'wishlist' ? 
                        state.wishListedProducts = state.wishListedProducts.filter(p => p._id !== existingProduct._id) :
                        state.cartProducts = state.cartProducts.filter(p => p._id !== existingProduct._id)
                }
                else{
                    existingProduct.quantity = existingProduct.quantity + change
                }                    
            }
        }
    }
})

export default productCardSlice.reducer

export const { addProduct, removeProduct, changeQuantity } = productCardSlice.actions

