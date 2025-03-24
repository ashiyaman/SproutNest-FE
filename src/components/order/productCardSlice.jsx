import { createSlice } from "@reduxjs/toolkit"; 

export const productCardSlice = createSlice({
    name: 'productCard',
    initialState: {
        wishlistedProducts: [],
        cartProducts: [],
        totalCartAmount: 0,
        cartDiscount: 0,
        deliveryCharge: 99
    },
    reducers: {
        addProduct: (state, action) => {
            const {type, product} = action.payload
            
            if(type === 'cart'){
                const existingProduct = state.cartProducts.find(p => p._id === product._id)
                if(existingProduct){
                    existingProduct.quantity += 1
                    existingProduct.totalPrice += product.price
                }
                else{
                    state.cartProducts.push({...product, quantity: 1, totalPrice: product.price})
                }                
                state.totalCartAmount += product.price
                state.cartDiscount = Math.round(state.totalCartAmount * 0.1)
                state.deliveryCharge = state.totalCartAmount >= 599 ? 0 : state.deliveryCharge
            }
            else{
                const existingProduct = state.wishlistedProducts.find(p => p._id === product._id)
                if(existingProduct) {
                    return
                }
                else{
                    state.wishlistedProducts.push(product)
                }                
            }
        },

        removeProduct: (state, action) => {
            const {type, product} = action.payload
            if(type === 'cart'){
                state.cartProducts = state.cartProducts.filter(p => p._id !== product._id)
                state.totalCartAmount -= ( product.price * product.quantity)
                state.cartDiscount = Math.round(state.totalCartAmount * 0.1)
                state.deliveryCharge = state.totalCartAmount >= 599 ? 0 : state.deliveryCharge
            }
            else{
                state.wishlistedProducts = state.wishlistedProducts.filter(p => p._id !== product._id)
            }
        },

        changeQuantity: (state, action) => {
            const {product, change } = action.payload
            const selectedProduct = state.cartProducts.find(p => p._id === product._id)
            if(change === +1){
                selectedProduct.quantity += 1
                selectedProduct.totalPrice += product.price
                state.totalCartAmount += product.price
            }
            else{
                selectedProduct.quantity -= 1
                selectedProduct.totalPrice -= product.price
                state.totalCartAmount -= product.price
            }
            state.cartDiscount = Math.round(state.totalCartAmount * 0.1)
            state.deliveryCharge = state.totalCartAmount >= 599 ? 0 : state.deliveryCharge
        }
    }
})

export const { addProduct, removeProduct, changeQuantity } = productCardSlice.actions

export default productCardSlice.reducer

